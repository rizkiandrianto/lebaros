import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Image from './Image';
import Modal from './Modal';
import ModalAddToCart from './Modal/ModalAddToCart';
import ModalDetail from './Modal/ModalDetail';
import setWishlist from '../../utils/addToWishlist';
import locale from '../../utils/locale';

export default withRouter(class ProductListItem extends Component {
  state = {
    modalAddToCart: false,
    modalDetail: false,
    wishlist: []
  }

  modalAddToCartOperation = this.modalAddToCartOperation.bind(this)
  modalDetailOperation = this.modalDetailOperation.bind(this)
  addToWishlist = this.addToWishlist.bind(this)

  componentDidMount() {
    this.setState({
      wishlist: localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []
    });
  }

  addToWishlist() {
    const { product } = this.props;
    setWishlist(product);
  }

  modalAddToCartOperation(modalAddToCart = true) {
    return () => {
      this.setState({
        modalAddToCart
      });
    };
  }

  modalDetailOperation(modalDetail = true) {
    return () => {
      this.setState({
        modalDetail
      });
    };
  }

  renderLabel() {
    const { product } = this.props;
    const isHasSize = product.variants.find(variable => variable.name === 'size');
    if (isHasSize) {
      return isHasSize.options.map((size) => (
        <span className="badge mr-1 mb-2 d-inline-block" key={size.id}>{size.name}</span>
      ));
    }

    return null;
  }

  renderModalAddToCart() {
    const { product } = this.props;
    const { modalAddToCart } = this.state;
    return (
      <Modal onHide={this.modalAddToCartOperation(false)} show={modalAddToCart}>
        {modalAddToCart && <ModalAddToCart product={product} onAdded={this.modalAddToCartOperation(false)} />}
      </Modal>
    );
  }

  renderModalDetail() {
    const { product } = this.props;
    const { modalDetail } = this.state;
    return (
      <Modal
        onHide={this.modalDetailOperation(false)}
        show={modalDetail}
        className="modal-fullscreen"
      >
        {modalDetail &&
        (<ModalDetail
          product={product}
          onAdded={this.modalDetailOperation(false)}
          onHide={this.modalDetailOperation(false)}
        />)
        }
      </Modal>
    );
  }

  render() {
    const { product, router } = this.props;
    const { wishlist } = this.state;
    return (
      <div className="row product-wrapper bg-white mb-4" key={product.id}>
        <div className="thumbnail-wrapper cursor-pointer" onClick={this.modalDetailOperation()}>
          <Image width={480} height={480} className="img-fluid thumbnail" src={product.media.source} />
        </div>
        <div className="col-12 border-top">

          <div className="row mt-2">
            <div className="col-6 col-md-9 d-flex align-items-center">
              <p
                className="product-name cursor-pointer text-truncate font-weight-bold"
                onClick={this.modalDetailOperation()}
              >
                {product.name}
              </p>
            </div>
            <div className="col-6 col-md-3 text-right d-flex align-items-center justify-content-end">
              <a onClick={this.addToWishlist}>
                <Image
                  width={24}
                  height={24}
                  src={`/images/icon-heart-${ wishlist.find(item => item.id === product.id) ? 'berry' : 'greyDark'}.png`}
                  className="mr-3"
                />
              </a>
              <button
                onClick={this.modalAddToCartOperation()}
                className="btn btn-primary btn-sm ml-2 text-capitalize"
              >
                {locale.buy[router.locale]}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <p
                className="text-truncate cursor-pointer mb-2"
                onClick={this.modalDetailOperation()}
              >
                {product.price.formatted}
              </p>
              <p className="badge-wrapper cursor-pointer" onClick={this.modalDetailOperation()}>
                {this.renderLabel()}
              </p>
            </div>
          </div>
        </div>
        {this.renderModalAddToCart()}
        {this.renderModalDetail()}
      </div>
    )
  }
})
