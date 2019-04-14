import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import formaNumber from '../../../utils/number';
import Image from '../Image';

export default class ModalDetail extends Component {
  componentDidMount() {
    const { product } = this.props;
    const variants = {};
    Object.keys(product.variantsDefinition).forEach((variant) => {
      variants[variant] = ''
    });

    this.setState({
      variant: variants
    });

    findDOMNode(this.wrapper).parentElement.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    findDOMNode(this.wrapper).parentElement.removeEventListener('scroll', this.scrollHandler);
  }

  state = {
    variant: {},
    scrolled: false
  }

  selectVariant = this.selectVariant.bind(this)
  addToCart = this.addToCart.bind(this)
  setRef = this.setRef.bind(this)
  scrollHandler = this.scrollHandler.bind(this)
  closeDetail = this.closeDetail.bind(this)

  scrollHandler(e) {
    this.setState({
      scrolled: e.target.scrollTop > 100
    });
  }

  closeDetail() {
    const { onHide } = this.props;
    if (onHide) onHide();
  }

  addToCart() {
    const { onAdded } = this.props;
    if (onAdded) onAdded();
  }

  setRef(e) {
    if (e) this.wrapper = e;
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
    const { scrolled, variant } = this.state;

    return (
      <div className="row mt-n3 pb-5 product-detail-wrapper" ref={this.setRef}>
        <div className={`sticky-top text-left action-header py-2 ${scrolled ? 'bg-white border-bottom' : ''}`}>
          <div className="container">
            <a onClick={this.closeDetail}>
              <Image src="/static/images/icon-arrow-left-greyDark.png" />
            </a>
          </div>
        </div>
        <div className="col-12 px-0 mt-n5">
          <Image src={product.images[0]} width="100%" />
        </div>

        <div className="row mx-0 mt-3">
          {
            product.images.map((image, index) => (
              <div className="col-2" key={index}>
                <Image src={image} width="100%" />
              </div>
            ))
          }
        </div>


        <div className="col-12 mt-3">
          <div className="row pb-3 border-bottom mb-2 mx-0">
            <div className="col-12 pl-0">
              <p>{formaNumber(product.price, true)}</p>
              <p className="product-name">{product.name}</p>
            </div>
          </div>

          {this.renderOption()}

          <div className="row mt-n1 px-3 pt-3">
            <div className="col-12 border-top px-0">
              <div className="row" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>

          {!Object.keys(variant).some(kind => !variant[kind]) && (
            <div className="row fixed-bottom footer-button">
              <div className="col-12">
                <button
                  className="btn btn-primary btn-block"
                  onClick={this.addToCart}
                >
                  Tambahkan ke Keranjang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
