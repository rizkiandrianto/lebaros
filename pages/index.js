
import React, { Component } from 'react'
import Head from "../components/layout/Head";
import Header from "../components/layout/Header";
import MarketCloud from '../utils/marketcloud';
import Image from '../components/common/Image';
import Loading from '../static/images/loading.txt';
import formaNumber from '../utils/number';


export default class Home extends Component {
  state = {
    loading: true,
    product: {
      data: []
    }
  }

  componentDidMount() {
    MarketCloud.products.list({}).then((res) => {
      this.setState({
        product: res,
        loading: false
      });
    })
  }

  renderLabel(item) {
    if (item.variantsDefinition.size) {
      return item.variantsDefinition.size.map((size) => (
        <span className="badge mr-1" key={size}>{size}</span>
      ));
    }

    return null;
  }

  renderProducts() {
    const { product } = this.state;
    if (product.data && product.data.length) {
      return product.data.map((item) => (
        <div className="row product-wrapper mb-5" key={item.id}>
          <div className="thumbnail-wrapper">
            <Image width="100%" className="img-fluid thumbnail" src={item.images[0]} />
          </div>
          <div className="col-12 border-top">

            <div className="row mt-2">
              <div className="col-6 d-flex align-items-center">
                <p className="badge-wrapper">
                  {this.renderLabel(item)}
                </p>
              </div>
              <div className="col-6 text-right">
                <Image src="/static/images/icon-heart-greyDark.png" className="mr-3" />
                <button className="btn btn-primary btn-sm">Beli</button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mt-2">
                <p className="text-truncate">{formaNumber(item.price, true)}</p>
                <p className="product-name">{item.name}</p>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return <Image src={Loading.toString()} />
  }

  render() {
    return (
      <>
        <Head />
        <Header />
        <div className="container main-container">
          {this.renderProducts()}
        </div>
      </>
    )
  }
}

