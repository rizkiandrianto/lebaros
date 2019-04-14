import Image from "../common/Image";

import React, { Component } from 'react'

export default class Header extends Component {
  state = {
    wishlist: []
  }

  componentDidMount() {
    this.setState({
      wishlist: localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : []
    });
  }

  render() {
    const { wishlist } = this.state;
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
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

