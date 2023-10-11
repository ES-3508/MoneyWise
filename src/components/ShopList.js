// ChildComponent.jsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ShopList = ({ data }) => {
  return (
    <List sx={{alignContent:"center"}}>
      {data.map((location, index) => (
        <ListItem key={index}>
          <ListItemText sx={{fontSize:25}}
            primary={location.name}
            secondary={`Rating: ${location.rate}, Phone: ${location.phone}, Open Time: ${location.opentime}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ShopList;
