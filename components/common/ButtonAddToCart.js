import { useContext, useState } from 'react';
import { withRouter } from 'next/router';
import firebase from 'firebase/app';
import Cookies from 'js-cookie';
import { setCart } from '../../reducer/action';
import StoreContext from '../../reducer/context';
import { commerce } from '../../utils/commerce';
import locale from '../../utils/locale';
import ModalLogin from './Modal/ModalLogin';
import Spinner from './Spinner';

const ButtonAddToCart = ({ product, variants, router, onSuccess }) => {
  const { dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  
  const addToCart = () => {
    const isLoggedin = firebase.auth().currentUser;
    setLoading(true);
    if (isLoggedin) {
      const { variants: productVariant } = product;
      const isHasVariants = productVariant.length;
      const updatedVariants = {};
  
      if (isHasVariants) {
        productVariant.filter((variant) => {
          const isChoosen = Object.keys(variants).find(varState => varState === variant.name);
          if (isChoosen) {
            const choosenVariant = productVariant.find(prodVar => prodVar.name === isChoosen);
            updatedVariants[choosenVariant.id] = variants[isChoosen];
          }
        });
      }
  
      commerce.cart.add(product.id, 1, updatedVariants)
        .then((added) => {
          dispatch(setCart(added.cart));
          setLoading(false);
          if (onSuccess) onSuccess();
        });
    } else {
      setModalLogin(true);
    }
  }

  const successLogin = () => {
    setModalLogin(false);
    setTimeout(() => {
      commerce.cart.retrieve(Cookies.get(process.env.NEXT_PUBLIC_COOKIE_CART))
        .then((cart) => {
          dispatch(setCart(cart));
          addToCart();
        });
    }, 1000);
  }

  return (
    <>
      <button
        className="btn btn-primary btn-block text-capitalize"
        disabled={Object.keys(variants).some(kind => !variants[kind]) || loading}
        onClick={addToCart}
      >
        {loading ? <Spinner /> : locale.addToCart[router.locale]}
      </button>
      <ModalLogin
        onHide={() => {
          setModalLogin(false);
          setLoading(false)
        }}
        onSuccess={() => successLogin()}
        show={modalLogin}
      />
    </>
  )
}

export default withRouter(ButtonAddToCart);