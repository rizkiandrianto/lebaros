import React, { Component } from 'react'
import Image from './Image';
import formaNumber from '../../utils/number';
import Modal from './Modal';
import ModalAddToCart from './Modal/ModalAddToCart';
import ModalDetail from './Modal/ModalDetail';
import setWishlist from '../../utils/addToWishlist';

export default class ProductListItem extends Component {
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
    if (product.variantsDefinition.size) {
      return product.variantsDefinition.size.map((size) => (
        <span className="badge mr-1" key={size}>{size}</span>
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
    const { product } = this.props;
    const { wishlist } = this.state;
    return (
      <div className="row product-wrapper mb-5" key={product.id}>
        <div className="thumbnail-wrapper cursor-pointer" onClick={this.modalDetailOperation()}>
          <Image width="100%" className="img-fluid thumbnail" src={product.images[0]} />
        </div>
        <div className="col-12 border-top">

          <div className="row mt-2">
            <div className="col-6 d-flex align-items-center">
              <p className="badge-wrapper cursor-pointer" onClick={this.modalDetailOperation()}>
                {this.renderLabel()}
              </p>
            </div>
            <div className="col-6 text-right">
              <a onClick={this.addToWishlist}>
                <Image
                  src={`/static/images/icon-heart-${ wishlist.find(item => item.id === product.id) ? 'berry' : 'greyDark'}.png`}
                  className="mr-3"
                />
              </a>
              <button
                onClick={this.modalAddToCartOperation()}
                className="btn btn-primary btn-sm"
              >
                Beli
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <p
                className="text-truncate cursor-pointer"
                onClick={this.modalDetailOperation()}
              >
                {formaNumber(product.price, true)}
              </p>
              <p
                className="product-name cursor-pointer"
                onClick={this.modalDetailOperation()}
              >
                {product.name}
              </p>
            </div>
          </div>
        </div>
        {this.renderModalAddToCart()}
        {this.renderModalDetail()}
      </div>
    )
  }
}
