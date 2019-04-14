import React, { Component } from 'react'
import formaNumber from '../../../utils/number';
import Image from '../Image';
import setCart from '../../../utils/addToCart';

export default class ModalAddToCart extends Component {
  componentDidMount() {
    const { product } = this.props;
    const variants = {};
    Object.keys(product.variantsDefinition).forEach((variant) => {
      variants[variant] = ''
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
          [variant]: kind
        }
      }));
    };
  }

  renderOption() {
    const { product } = this.props;
    const { variant: stateVariant } = this.state;
    return Object.keys(product.variantsDefinition)
      .map((variant, index) => (
        <div key={index}>
          <p className="text-capitalize">{variant}</p>
          <div className="mb-2">
            {product.variantsDefinition[variant].map((kind) => (
              <button
                onClick={this.selectVariant(variant, kind)}
                className={`btn
                btn-sm
                btn-outline-${stateVariant[variant] === kind ? 'primary' : 'secondary'}
                text-uppercase mr-1`}
              >
                {kind}
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
            <div className="col d-flex align-items-center">
              <Image src={product.images[0]} width="100%" />
            </div>
            <div className="col-10 pl-0">
              <p>{product.name}</p>
              <p>{formaNumber(product.price, true)}</p>
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
