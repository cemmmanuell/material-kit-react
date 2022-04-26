import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/core';
import { useEffect } from 'react';


export default function SelectOptions(props) {
    const options = props.options;
    const defaults=props.selected;
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [default_, setDefault]=React.useState({});
 

    useEffect(() => {
     setDefault(defaults);
  }, [defaults])
    console.log(default_);
    return (
     
    <div>
     
     <Autocomplete
             
              id="tags-outlined"
              options={options}
              onLoad={props.handleGroup(default_)}
              value={default_}
              getOptionLabel={(option) => option.name}
              onChange={(event, values)=>{
               
                props.handleGroup(values);
                setDefault(values);
               
               
              }
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={props.label}
               
                />
              )}
            />
    </div>
  );
}