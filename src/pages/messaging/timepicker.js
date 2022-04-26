import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import { TextField } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { LocalizationProvider } from '@material-ui/lab';
import { StaticTimePicker } from '@material-ui/lab';

export default function StaticTimePickerDemo(props) {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        orientation="landscape"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          props.onChangeTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
