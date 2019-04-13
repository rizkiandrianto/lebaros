import React, { Component } from 'react'
import Image from './Image';
import formaNumber from '../../utils/number';
import Modal from './Modal';
import ModalAddToCart from './Modal/ModalAddToCart';

export default class ProductListItem extends Component {
  state = {
    modalDetail: false
  }

  modalDetailOperation = this.modalDetailOperation.bind(this)

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
    const { modalDetail } = this.state;
    return (
      <Modal onHide={this.modalDetailOperation(false)} show={modalDetail}>
        {modalDetail && <ModalAddToCart product={product} onAdded={this.modalDetailOperation(false)} />}
      </Modal>
    );
  }

  render() {
    const { product } = this.props;
    return (
      <div className="row product-wrapper mb-5" key={product.id}>
        <div className="thumbnail-wrapper">
          <Image width="100%" className="img-fluid thumbnail" src={product.images[0]} />
        </div>
        <div className="col-12 border-top">

          <div className="row mt-2">
            <div className="col-6 d-flex align-items-center">
              <p className="badge-wrapper">
                {this.renderLabel()}
              </p>
            </div>
            <div className="col-6 text-right">
              <Image src="/static/images/icon-heart-greyDark.png" className="mr-3" />
              <button
                onClick={this.modalDetailOperation()}
                className="btn btn-primary btn-sm"
              >
                Beli
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <p className="text-truncate">{formaNumber(product.price, true)}</p>
              <p className="product-name">{product.name}</p>
            </div>
          </div>
        </div>
        {this.renderModalAddToCart()}
      </div>
    )
  }
}
