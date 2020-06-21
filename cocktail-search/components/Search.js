import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { lightBlue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import { FirebaseWrapper } from '../lib/db/firebase';

const styles = makeStyles(() => ({
  root: {
    backgroundColor: lightBlue[500],
  },
}));

export default function Search({ drinks, setDrink, setDrinks }) {
  const findDrink = async (event, value) => {
    try {
      const drink = await FirebaseWrapper.GetInstance().GetSingleDrink(value);
      if (drink) {
        setDrinks([]);
        return setDrink(drink);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setDrink([]);
  };

  const classes = styles();
  return (
    <Autocomplete
      id="Search Drinks"
      inputLabel="Search Drinks"
      options={drinks}
      classes={classes}
      onClose={handleClose}
      getOptionLabel={(drink) => drink.name}
      onInputChange={findDrink}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />
  );
}
