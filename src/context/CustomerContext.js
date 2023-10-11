import { createContext, useEffect, useReducer,useState } from 'react';
import axios from 'axios';
const initialState = {
  location:null,
  rate:null,
  shopList:null
};



function reducer(state, action) {
    switch (action.type) {
      case 'SETLOCATION': {
        console.log("payload",action.payload)
        const {location}= action.payload;
        console.log({ ...state});
        return { ...state,location };
    }
        case 'SETCURRENCY': {
            const { currency} = action.payload;
            console.log({ ...state,currency });
            return { ...state,currency };
        }


        default:
            return state;
    }
}

const HomeContext = createContext({
  ...initialState,
  setLocation: () => {},
  setCurrency: () => {},
  getShopList: () => {}
});

export const HomeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sliderValue1, setSliderValue1] = useState({slider:1});
  const setLocation = async (location) => {
    try {
        dispatch({ type: 'SETLOCATION',payload:{location:location});
      
    } catch (error) {
      throw error;
    }
  };

  const handleSliderChange = (sliderName, newValue) => {
    dispatch({ type: 'SLIDER',payload:{[sliderName]:newValue} });
  };

 

  const submit  = async (data) => {
    try{
        const response = await axios.post('/api/auth/register', { data});
        const { suggestions } = response.data;
        dispatch({ type: 'SUBMIT',payload:{suggestions} });
    }catch (error) {
        throw error;
      }
  };

  

  // SHOW LOADER
  // if (!state.isInitialised) return <MatxLoading />;

  return (
    <HomeContext.Provider value={{ ...state, setCurrency,setLocation}}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;
