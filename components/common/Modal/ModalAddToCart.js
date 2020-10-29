import React, { Component } from 'react'
import Image from '../Image';
import setCart from '../../../utils/addToCart';

export default class ModalAddToCart extends Component {
  componentDidMount() {
    const { product } = this.props;
    const variants = {};
    product.variants.forEach((variant) => {
      variants[variant.name] = ''
    });

    this.setState({
      variant: variants
    });
  }

  state = {
    variant: {}
  }

  selectVariant = this.selectVariant.bind(this)
  addToCart = this.addToCart.bind(this)

  addToCart() {
    const { onAdded, product } = this.props;
    if (onAdded) onAdded();
    setCart(product);
  }

  selectVariant(variant, kind) {
    return () => {

      this.setState(prevState => ({
        variant: {
          ...prevState.variant,
          [variant.name]: kind.id
        }
      }));
    };
  }

  renderOption() {
    const { product } = this.props;
    const { variant: stateVariant } = this.state;
    return product.variants
      .map((variant, index) => (
        <div key={index}>
          <p className="text-capitalize">{variant.name}</p>
          <div className="mb-2">
            {product.variants[index].options.map((kind) => (
              <button
                key={kind.id}
                onClick={this.selectVariant(variant, kind)}
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

  render() {
    const { product } = this.props;
    const { variant } = this.state;

    return (
      <div className="row">
        <div className="col-12">
          <div className="row pb-3 border-bottom mb-2">
            <div className="col d-flex align-items-center justify-content-center">
              <Image src={product.media.source} width={200} height={200} className="object-fit-contain" />
            </div>
            <div className="col-10">
              <p>{product.name}</p>
              <p>{product.price.formatted}</p>
            </div>
          </div>

          {this.renderOption()}

          <div className="row pt-3 border-top mt-3">
            <div className="col-12">
              <button
                className="btn btn-primary btn-block"
                disabled={Object.keys(variant).some(kind => !variant[kind])}
                onClick={this.addToCart}
              >
                Tambahkan ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
