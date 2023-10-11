import React,{useState,useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios'
const currencies = [
  { code: 'USD', label: 'United States Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'LKR', label: 'Sri Lankan Rupee' },
  // Add more currencies as needed
];

const ToSelector = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const instance = axios.create({
      auth: {
        username: 'infozenit28348152',
        password: 'nfabehsuhv9kif5ji7c744dlou',
      },
    });

    instance.get('https://xecdapi.xe.com/v1/currencies')
      .then(response => {
        setCurrencies(response.data.currencies);
        console.log(response.data.currencies)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Autocomplete
      disabled // Disable the Autocomplete
      value="LKR" // Set the default value to "LKR"
      style={{ width: '50%',minWidth:'180px'}}
      options={currencies.map((option) => option.iso)}
      renderInput={(params) => (
        <TextField {...params} label="TO" variant="outlined" />
      )}
    />
  );
};

export default ToSelector;
