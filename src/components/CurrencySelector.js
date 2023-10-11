import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box, Typography } from '@mui/material';
import ToSelector from './ToSelector';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import axios from 'axios';
const CurrencySelect = ({handleCurrency}) => {
  const [value, setValue] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [rate, setRate] = useState(0); // To avoid undefined error
  const [amount, setAmount] = useState(1)

  useEffect(() => {
    const instance = axios.create({
      auth: {
        username: 'infozenit28348152',
        password: 'nfabehsuhv9kif5ji7c744dlou',
      },
    });

    instance.get('https://xecdapi.xe.com/v1/currencies').then((response) => {
      setCurrencies(response.data.currencies);
    }).catch((error) => {
      console.error(error);
    });

    if (value) {
      instance
        .get('https://xecdapi.xe.com/v1/convert_from/?from=' + value + '&to=LKR&amount=1')
        .then((response) => {
          setRate(response.data.to[0].mid);
        }).catch((error) => {
          console.error(error);
        });
    } else{
      setRate(0)
    }
  }, [value]);

  return (
    <>
      <Grid container spacing={2} sx={{ alignContent: 'left', fontSize: 40,padding:5,border:true }}>
        <Grid item xs={2}>
          <Box>
            
            <Typography sx={{ fontSize: 40 }}>1</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              handleCurrency(newValue)

            }}
            freeSolo
            options={currencies.map((option) => option.iso)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="FROM"
                variant="outlined"
                style={{ width: '50%', minWidth: '180px' }} // Set the text field width to 25%
                InputLabelProps={{ style: { fontSize: 16 } }} // Increase label font size
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <SyncAltIcon sx={{ fontSize: 40 }} />
        </Grid>
        <Grid item xs={2} sx={{ fontSize: 40 }}>
         {rate.toFixed(2)}
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Typography>
              <ToSelector />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CurrencySelect;
