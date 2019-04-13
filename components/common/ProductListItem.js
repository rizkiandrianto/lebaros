import React, { Component } from 'react'
import Image from './Image';
import formaNumber from '../../utils/number';

export default class ProductListItem extends Component {
  renderLabel() {
    const { product } = this.props;
    if (product.variantsDefinition.size) {
      return product.variantsDefinition.size.map((size) => (
        <span className="badge mr-1" key={size}>{size}</span>
      ));
    }

    return null;
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
              <button onClick={this.buy} className="btn btn-primary btn-sm">Beli</button>
            </div>
          </div>

          <div className="row">
            <div className="col-12 mt-2">
              <p className="text-truncate">{formaNumber(product.price, true)}</p>
              <p className="product-name">{product.name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
