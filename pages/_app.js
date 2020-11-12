import { useEffect, useReducer } from 'react';
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import reducer from '../reducer';
import StoreContext from '../reducer/context';
import initialState from '../reducer/store';
import 'firebase/auth';
import 'firebase/firestore';
import '../styles/bundle.scss';
import firebaseConfig from '../utils/firebase.config';
import { setCart, setUser } from '../reducer/action';
import { commerce } from '../utils/commerce';

export default function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        const doc = firebase.firestore().collection('users').doc(user.uid);
        const getCurUser = await doc.get();
        dispatch(setUser(user));
        if (getCurUser) {
          const cartId = commerce.cart.id();
          const param = {
            cart: cartId
          };
          if (getCurUser.exists) {
            const cart = await commerce.cart.retrieve(getCurUser.data().cart);
            Cookies.set(process.env.NEXT_PUBLIC_COOKIE_CART, cart.id, {
              domain: window.location.hostname,
              expires: 30
            });
            param.cart = cart.id;
            doc.update(param);
            dispatch(setCart(cart));
          } else {
            doc.set(param);
          }
        }
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);
  
  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}