import React from "react";
import * as PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,

  Slide
} from "@material-ui/core";
import clsx from "clsx";
import red from "@material-ui/core/colors/red";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  dialog: {
    borderRadius: 0
  },
  button: {
    borderRadius: 0,
    textTransform: "none",
    padding: 5
  },
  logout: {
    color: "#fff",
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  countdown: {
    color: red[700]
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SessionTimeoutDialog({
  open,
  countdown,
  onLogout,
  onContinue
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      aria-labelledby="session-timeout-dialog"
      aria-describedby="session-timeout-dialog"
      classes={{ paper: classes.dialog }}
      TransitionComponent={Transition}
    >
      <DialogTitle id="session-timeout-dialog-title">
        Session Timeout
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          The current session is about to expire in{" "}
          <span className={classes.countdown}>{countdown}</span> seconds.
        </Typography>
        <Typography variant="body2">{`Would you like to continue the session?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onLogout}
          variant="contained"
          className={clsx(classes.logout, classes.button)}
        >
          Logout
        </Button>
        <Button
          onClick={onContinue}
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Continue Session
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SessionTimeoutDialog.propTypes = {
  /**
   * indicator whether the dialog is open/close
   */
  open: PropTypes.bool.isRequired,
  /**
   * the countdown timer.
   */
  countdown: PropTypes.number.isRequired,
  /**
   * callback function to handle closing action
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * callback function to handle confirm action.
   */
  onContinue: PropTypes.func.isRequired
};