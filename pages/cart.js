import { withRouter } from 'next/router';
import { useContext } from 'react';
import CartProductListItem from '../components/common/cart/CartProductListItem';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import StoreContext from '../reducer/context';
import locale from '../utils/locale';
import Link from 'next/link';

const Cart = ({ router }) => {
  const { state } = useContext(StoreContext);

  const getUrlCheckout = () => {
    if (!state?.cart?.hosted_checkout_url || !state?.cart?.line_items?.length) {
      return '/';
    }

    return `${state?.cart?.hosted_checkout_url}?return_url=${window.location.origin}`;
  }

  const getButtonCheckoutCaption = () => {
    if (state?.cart?.line_items?.length) {
      return `${locale.checkout[router.locale]} (${state?.cart?.subtotal?.formatted_with_symbol})`
    }

    return locale.backToHome[router.locale];
  }

  const renderSentence = () => {
    const sentence = locale[!state.cart ? 'loading' : 'noProduct'][router.locale];

    if (!state.cart ||
      state.cart && !state?.cart?.line_items?.length
    ) {
      return (
        <p className="text-capitalize text-center mt-5">
          {sentence}
        </p>
       );
    }

    return null;
  }

  return (
    <>
      <Head />
      <Header title={locale.cart[router.locale]} />

      <div className="container main-container">
        <ul className="list-group">
          {renderSentence()}
          {(state?.cart?.line_items || []).map((product, id) => (
            <CartProductListItem key={id} product={product} />
          ))}
        </ul>
      </div>
      <div className={`fixed-bottom py-3 ${!state.cart ? 'd-none' : ''}`}>
        <div className="container">
          <Link href={getUrlCheckout()}>
            <button className="btn btn-block btn-primary text-capitalize">
              {getButtonCheckoutCaption()}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Cart);