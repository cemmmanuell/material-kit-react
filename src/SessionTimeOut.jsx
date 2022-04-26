import React, { useContext, useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { AppStateContext } from "./Context";
import { useNavigate } from "react-router";
import SessionTimeoutDialog from "./SessionTimeoutdialog";

let countdownInterval;
let timeout;
export default function SessionTimeout() {
  const idleTimer = useRef(null);
  const navigate =useNavigate();

   const { isAuthenticated, handleLogoutUser } = useContext(
    AppStateContext
  );

  const [timeoutModalOpen, setTimeoutModalOpen] = useState(false);
  const [timeoutCountdown, setTimeoutCountdown] = useState(0);


  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };

  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };

  const handleLogout = (isTimedOut = false) => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
    handleLogoutUser(isTimedOut);
  };

  const handleContinue = () => {
    setTimeoutModalOpen(false);
    clearSessionInterval();
    clearSessionTimeout();
  };

  const onActive = () => {
    console.log('active')
    if (!timeoutModalOpen) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  const onIdle = () => {
    console.log('idle');
    const delay = 7000 * 5 * 1;
    if (isAuthenticated && !timeoutModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 10;
        setTimeoutModalOpen(true);
        setTimeoutCountdown(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeoutCountdown(--countDown);
           
          } else {
           
            handleLogout(false);
          }
        }, 1000);
      }, delay);
    }
  };

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={5000}
      />
      <SessionTimeoutDialog
        countdown={timeoutCountdown}
        onContinue={handleContinue}
        onLogout={() => handleLogout(false)}
        open={timeoutModalOpen}
      />
    </>
  );
}