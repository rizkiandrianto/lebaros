import { useReducer } from 'react';
import reducer from '../reducer';
import StoreContext from '../reducer/context';
import initialState from '../reducer/store';
import '../styles/bundle.scss';

export default function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}