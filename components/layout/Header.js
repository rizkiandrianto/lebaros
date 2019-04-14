import Image from "../common/Image";

import React, { Component } from 'react'

export default class Header extends Component {
  state = {
    wishlist: [],
    cart: []
  }

  componentDidMount() {
    this.setState({
      wishlist: localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [],
      cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    });
  }

  render() {
    const { cart, wishlist } = this.state;
    return (
      <header className="main-header fixed-top d-flex align-items-center bg-white border-bottom">
        <div className="container">
          <div className="row">
            <div className="col">
              <a>
                <Image src="/static/images/icon-arrow-left-greyDark.png" />
              </a>
            </div>
            <div className="col-5">
              <p className="mb-0">Dress</p>
            </div>
            <div className="col text-right">
              <a>
                <Image src="/static/images/icon-search-greyDark.png" />
              </a>
            </div>
            <div className="col text-right">
              <a>
                <Image src="/static/images/icon-heart-greyDark.png" />
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </a>
            </div>
            <div className="col text-right">
              <a>
                <Image src="/static/images/icon-cart-greyDark.png" />
                {cart.length > 0 && <span className="badge">{cart.length}</span>}
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

