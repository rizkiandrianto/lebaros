import { withRouter } from 'next/router';
import { useContext, useState } from 'react';
import { setCart } from '../../../reducer/action';
import StoreContext from '../../../reducer/context';
import { commerce } from '../../../utils/commerce';
import locale from '../../../utils/locale';
import Image from '../Image';
import Spinner from '../Spinner';

const CartProductListItem = ({ product, router }) => {
  const { dispatch } = useContext(StoreContext);
  const [quantity, setQuantity] = useState(product.quantity);
  const [debounce, setDebounce] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateQuantity = (value = 0) => {
    setQuantity(value);
    if (!value || !parseInt(value)) return;
    if  (debounce) clearTimeout(debounce);
    setDebounce(setTimeout(async () => {
      const updatedItem = await commerce.cart.update(product.id, {
        quantity: value
      })
      dispatch(setCart(updatedItem.cart));
    }, 300))
  }

  const deleteItem = async () => {
    setLoading(true);
    const deletedItem = await commerce.cart.remove(product.id);
    dispatch(setCart(deletedItem.cart));
    setLoading(false);
  }

  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-3">
          <Image src={product.media.source} width={110} height={110} />
        </div>
        <div className="col-9">
          <p className="font-weight-bold">{product.name}</p>
          <div>
            <div class="form-group mt-2" style={{ width: '30%' }}>
              <input onChange={(e) => updateQuantity(e.target.value)} type="number" class="form-control form-control-sm" value={quantity} />
            </div>
            <button
              className="btn btn-outline-danger btn-sm text-capitalize"
              onClick={() => deleteItem()}
            >
              {loading ? <Spinner /> :  locale.removeItemFromCart[router.locale]}
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default withRouter(CartProductListItem);