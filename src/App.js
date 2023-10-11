import { Box } from '@mui/material';
import './App.css'
import MapContainer from './components/MapContainer';
import CurrencySelect from './components/CurrencySelector';
import SearchAppBar from './components/NavBar';

import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import ShopList from './components/ShopList';
import { useEffect, useState } from 'react';
const data=[
  { lat: 6.7 , lng: 80.1 ,rate:45,name:"Shop 1",phone:"07xxxxxxxx",opentime:"08. 00 AM 05.00 PM"}, 
  { lat: 6.6 , lng: 80.0 ,rate:15,name:"shop 2" ,phone:"07xxxxxxxx",opentime:"08. 00 AM 05.00 PM"},
  { lat: 6.8 , lng: 79.96 ,rate:20,name:"shop 3",phone:"07xxxxxxxx" ,opentime:"08. 00 AM 05.00 PM"}
  // Add more locations as needed
    ]
function App() {
  const [location, setLocation] = useState(null)
  const [currency, setCurreny] = useState(null)
  const getLocation = (locaiton) => {
    setLocation(locaiton)
  };

  const getCurrency= (currency) => {
    setCurreny(currency)
  };

  return (
    <div className="App">
    <SearchAppBar/>
    <CurrencySelect handleCurrency={getCurrency}/>
    <Grid container spacing={2}>
      <Grid item xs={6} >
        <MapContainer handleLocation={getLocation} locations={data} />
      </Grid>
      {/* 40% width container */}
      <Grid item xs={6}>
        <Typography variant='h2'>Shop List</Typography>
        <ShopList data={data}/>
      </Grid>
    </Grid>

    <Box sx={{alignItems:"center"}}>
    

    </Box>
    
    </div>
  );
}

export default App;
