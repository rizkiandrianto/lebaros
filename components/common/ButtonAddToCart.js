import { withRouter } from 'next/router';
import { useContext, useState } from 'react';
import { setCart } from '../../reducer/action';
import StoreContext from '../../reducer/context';
import { commerce } from '../../utils/commerce';
import locale from '../../utils/locale';
import Spinner from './Spinner';

const ButtonAddToCart = ({ product, variants, router, onSuccess }) => {
  const { dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  
  const addToCart = () => {
    const { variants: productVariant } = product;
    const isHasVariants = productVariant.length;
    const updatedVariants = {};

    setLoading(true);

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
  }

  return (
    <button
      className="btn btn-primary btn-block text-capitalize"
      disabled={Object.keys(variants).some(kind => !variants[kind]) || loading}
      onClick={addToCart}
    >
      {loading ? <Spinner /> : locale.addToCart[router.locale]}
    </button>
  )
}

export default withRouter(ButtonAddToCart);