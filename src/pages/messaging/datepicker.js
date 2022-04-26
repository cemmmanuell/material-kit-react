import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import { TextField } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { LocalizationProvider } from '@material-ui/lab';
import { StaticDatePicker } from '@material-ui/lab';

export default function StaticDatePickerLandscape(props) {
  const [value, setValue] = React.useState(new Date());

  function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        shouldDisableDate={disablePrevDates(new Date())}
        onChange={(newValue) => {
          setValue(newValue);
          props.onChangeDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
