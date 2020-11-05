import { useEffect, useState } from 'react'
import Image from '../Image';
import ButtonAddToCart from '../ButtonAddToCart';

const ModalAddToCart = ({ product, onSuccess }) => {
  
  const [variant, setVariant] = useState({});

  useEffect(() => {
    const variants = {};
    product.variants.forEach((variant) => {
      variants[variant.name] = ''
    });
    setVariant({
      ...variants,
      variants
    });
  }, []);

  const selectVariant = (variantValue, kind) => {
    setVariant({
      ...variant,
      [variantValue.name]: kind.id
    })
  }

  const renderOption = () => {
    const stateVariant = variant;
    return product.variants
      .map((variant, index) => (
        <div key={index}>
          <p className="text-capitalize">{variant.name}</p>
          <div className="mb-2">
            {product.variants[index].options.map((kind) => (
              <button
                key={kind.id}
                onClick={() => selectVariant(variant, kind)}
                className={`btn
                btn-sm
                btn-outline-${stateVariant[variant.name] === kind.id ? 'primary' : 'secondary'}
                text-uppercase mr-1`}
              >
                {kind.name}
              </button>
            ))}
          </div>
        </div>
      ))
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="row pb-3 border-bottom mb-2">
          <div className="col d-flex align-items-center justify-content-center">
            <Image src={product?.media?.source} width={200} height={200} className="object-fit-contain" />
          </div>
          <div className="col-10">
            <p>{product?.name}</p>
            <p>{product?.price?.formatted}</p>
          </div>
        </div>

        {renderOption()}

        <div className="row pt-3 border-top mt-3">
          <div className="col-12">
            <ButtonAddToCart product={product} variants={variant} onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAddToCart;