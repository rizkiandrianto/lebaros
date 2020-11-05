import React, { Component } from 'react'
import { commerce } from '../../utils/commerce';
import Image from "../common/Image";

export default class Header extends Component {
  state = {
    wishlist: [],
    cart: null
  }

  async componentDidMount() {
    const cart = await commerce.cart.retrieve();

    this.setState({
      wishlist: localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [],
      cart
    });
  }

  render() {
    const { cart, wishlist } = this.state;
    return (
      <header className="main-header fixed-top d-flex align-items-center bg-white border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-auto">
              <a>
                <Image width={24} height={24} src="/images/icon-arrow-left-greyDark.png" />
              </a>
            </div>
            <div className="flex-grow-1">
              <p className="mb-0">Dress</p>
            </div>
            <div className="col-auto text-right">
              <a>
                <Image width={24} height={24} src="/images/icon-search-greyDark.png" />
              </a>
            </div>
            <div className="col-auto text-right">
              <a>
                <Image width={24} height={24} src="/images/icon-heart-greyDark.png" />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </a>
            </div>
            <div className="col-auto text-right">
              <a href={cart?.hosted_checkout_url}>
                <Image width={24} height={24} src="/images/icon-cart-greyDark.png" />
                {cart?.line_items?.length > 0 && <span className="badge">{cart?.line_items?.length}</span>}
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

