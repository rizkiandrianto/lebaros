import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Lightbox from 'react-image-lightbox';
import Image from '../Image';
import setCart from '../../../utils/addToCart';

export default class ModalDetail extends Component {
  componentDidMount() {
    const { product } = this.props;
    const variants = {};
    product.variants.forEach((variant) => {
      variants[variant.name] = ''
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
    scrolled: false,
    photoIndex: 0,
    zoomImage: false
  }

  selectVariant = this.selectVariant.bind(this)
  addToCart = this.addToCart.bind(this)
  setRef = this.setRef.bind(this)
  scrollHandler = this.scrollHandler.bind(this)
  closeDetail = this.closeDetail.bind(this)
  operateZoom = this.operateZoom.bind(this)
  lightboxHandler = this.lightboxHandler.bind(this)

  lightboxHandler(photoIndex) {
    return () => {
      this.setState({
        photoIndex
      })
    }
  }

  operateZoom(zoomImage = true) {
    return () => {
      this.setState({
        zoomImage
      });
    }
  }

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
    const { onAdded, product } = this.props;
    if (onAdded) onAdded();
    setCart(product);
  }

  setRef(e) {
    if (e) this.wrapper = e;
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
    const { photoIndex, scrolled, variant, zoomImage } = this.state;
    const { assets: images = [] } = product;

    return (
      <div className="row mt-n3 pb-5 product-detail-wrapper" ref={this.setRef}>
        <div className={`sticky-top text-left action-header py-2 ${scrolled ? 'bg-white border-bottom' : ''}`}>
          <div className="container">
            <a onClick={this.closeDetail}>
              <Image width={24} height={24} src="/images/icon-arrow-left-greyDark.png" />
            </a>
          </div>
        </div>

        <div className="col-12 px-0 mt-n5" onClick={this.operateZoom()}>
          <Image className="object-fit-contain" src={product.assets[photoIndex].url} width={480} height={500} />

          {zoomImage && (
            <Lightbox
              mainSrc={images[photoIndex].url}
              nextSrc={images[(photoIndex + 1) % images.length].url}
              prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
              onCloseRequest={this.operateZoom(false)}
              onMovePrevRequest={this.lightboxHandler((photoIndex + images.length - 1) % images.length)}
              onMoveNextRequest={this.lightboxHandler((photoIndex + 1) % images.length)}
            />
          )}
        </div>

        <div className="row mx-0 mt-3">
          {
            images.map((image, index) => (
              <div onClick={this.lightboxHandler(index)} className="col-2 px-2" key={index}>
                <Image
                  className={`object-fit-contain ${index === photoIndex ? 'border border-primary rounded' : ''}`}
                  src={image.url}
                  width={150}
                  height={150}
                />
              </div>
            ))
          }
        </div>


        <div className="col-12 mt-3">
          <div className="row pb-3 border-bottom mb-2 mx-0">
            <div className="col-12 pl-0">
              <p>{product.price.formatted}</p>
              <p className="product-name">{product.name}</p>
            </div>
          </div>

          {this.renderOption()}

          <div className="row mt-n1 px-3 pt-3">
            <div className="col-12 border-top px-0">
              <div className="my-3" dangerouslySetInnerHTML={{ __html: product.description }} />
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
