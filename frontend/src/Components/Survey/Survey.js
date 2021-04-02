import React, { useState } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  FormControl,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Box
} from '@material-ui/core';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

function Survey() {
  const [checked, setChecked] = useState(false);

  return(
    <div clasName="Form">
      <Box border={1}>
      <h1>Koneksa Survey</h1>
      <FormControl>
        <TextField id="outlined-basic" label="Name" variant="outlined" /><br/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Birthday"
            format="MM/dd/yyyy"
            // value={selectedDate}
            // onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <RadioGroup aria-label="Tech Preference" name="gender1" >
          <p>What is your tech preference?</p>
          <FormControlLabel value="Front-End" control={<Radio />} label="Front-End" />
          <FormControlLabel value="Back-End" control={<Radio />} label="Back-End" />
          <FormControlLabel value="Both" control={<Radio />} label="Both" />
      </RadioGroup>
      <div>
        What pizza toppings do you like?
        <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              // onChange={handleChange}
              color="primary"
            />
          }
          label="Cheese"
        />
        <FormControlLabel
          control={
            <Checkbox
              // checked={state.checkedB}
              // onChange={handleChange}
              color="primary"
            />
          }
          label="Pepperoni"
        />
      </div>
      <Button>Submit</Button>
      </FormControl>
      </Box>
    </div>
  );
}

export default Survey;