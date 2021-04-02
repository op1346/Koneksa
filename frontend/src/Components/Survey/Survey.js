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
  Button
} from '@material-ui/core';
import TimezoneSelect from 'react-timezone-select';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

function Survey() {
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const postURL = "";
    fetch(postURL, {
      method: "POST",
      headers: {

      },
      body: JSON.stringify({
        name: "",
        password: "",
        birthday: "",
        preferences: {
          techPref: "",
          pizzaToppings: [],
          timezone: ""
        }
      })
      .then(() => {
        alert('Form has been submitted!')
      })
    })
  }

  return(
    <div className="Form" onSubmit={handleSubmit}>
      <h1>Koneksa Survey</h1>
      <FormControl >
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
        <h2>Please select the timezone that you are in.</h2>
        <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
        <RadioGroup aria-label="Tech Preference" className="tech" >
          <h2>What is your tech preference?</h2>
          <FormControlLabel value="Front-End" control={<Radio />} label="Front-End" />
          <FormControlLabel value="Back-End" control={<Radio />} label="Back-End" />
          <FormControlLabel value="Both" control={<Radio />} label="Both" />
      </RadioGroup>
      <div>
        <h2>What pizza toppings do you like?</h2>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
            />
          }
          label="Cheese"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
            />
          }
          label="Pepperoni"
        />
      </div><br />
      <Button variant="contained" color="primary">Submit</Button>
      </FormControl>
    </div>
  );
}

export default Survey;