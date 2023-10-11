import React,{useState,useEffect} from 'react';
import Grid from '@mui/material/Grid';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Box, Typography } from '@mui/material';
import CurrencySelect from './CurrencySelector';
import ToSelector from './ToSelector';
import axios from 'axios'
const currencies = [
    { code: 'USD', label: 'United States Dollar' },
    { code: 'EUR', label: 'Euro' },
    { code: 'JPY', label: 'Japanese Yen' },
    { code: 'JPA', label: 'Japanese Yen' },
    // Add more currencies as needed
  ];
const MyGrid = ({value}) => {
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
    <Grid container spacing={2} sx={{alignContent:"center", fontSize:40}}>
      <Grid item xs={2}>
        <Box>
            <Typography sx={{fontSize:40}}>
                1
            </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <CurrencySelect currencies={currencies}/>
      </Grid>
      <Grid item xs={2}>
        <SyncAltIcon sx={{fontSize:40}}/>
      </Grid>
      <Grid item xs={2} sx={{fontSize:40}}>
            {value}
      </Grid>
      <Grid item xs={2}>
            <Box>
                <Typography>
                    <ToSelector/>
                </Typography>
            </Box>
      </Grid>
    </Grid>
  );
};

export default MyGrid;
