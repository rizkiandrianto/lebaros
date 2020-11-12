import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import SnackBar from 'node-snackbar';
import 'firebase/auth';
import { setCart } from '../../reducer/action';
import StoreContext from '../../reducer/context';
import { commerce } from '../../utils/commerce';
import Image from "../common/Image";
import Link from 'next/link';
import Spinner from '../common/Spinner';
import locale from '../../utils/locale';

const Header = ({ title, onBack }) => {
  const router = useRouter();
  const [ wishlist ] = useState(process.browser && window.localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []);
  const store = useContext(StoreContext);
  const { dispatch, state } = store;
  const { cart } = state;

  useEffect(async () => {
    const cart = await commerce.cart.retrieve();
    dispatch(setCart(cart));
  }, []);

  const backHandler = () => {
    if (onBack) return onBack();
    return (() => {
      router.push('/', '/', {
        locale: router.locale
      });
    })()
  }
  
  return (
    <header className="main-header fixed-top d-flex align-items-center bg-white border-bottom">
      <div className="container">
        <div className="row">
          <div className="col-auto">
            <a onClick={() => backHandler()}>
              <Image width={24} height={24} src="/images/icon-arrow-left-greyDark.png" />
            </a>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0 text-capitalize">{title}</p>
          </div>
          <div className="col-auto text-right">
            <Link href={router.asPath} locale={router.locale === 'en' ? 'id' : 'en'}>
              <a className="text-decoration-none">
                {router.locale === 'en' ? 'ID' : 'EN'}
              </a>
            </Link>
          </div>
          {Boolean(state.user) && (
            <div className="col-auto text-right">
              <a onClick={async () => {
                if (firebase.app.length) {
                  await firebase.auth().signOut();
                  const cart = await commerce.cart.refresh();
                  if (cart) dispatch(setCart(cart));
                  SnackBar.show({ text: locale.logoutSuccess[router.locale], showAction: false, customClass: 'text-capitalize' })
                }
              }}>
                <Image width={24} height={24} src="/images/icon-signout.png" />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </a>
            </div>
          )}
          <div className="col-auto text-right position-relative">
            {
              cart ? (
                <Link href="/cart">
                  <a>
                    <Image width={24} height={24} src="/images/icon-cart-greyDark.png" />
                    {cart?.line_items?.length > 0 && <span className="badge">{cart?.total_items}</span>}
                  </a>
                </Link>
              ) : <Spinner />
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;