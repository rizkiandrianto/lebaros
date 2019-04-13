
import React, { Component } from 'react'
import Head from "../components/layout/Head";
import Header from "../components/layout/Header";
import MarketCloud from '../utils/marketcloud';
import Image from '../components/common/Image';
import Loading from '../static/images/loading.txt';
import ProductListItem from '../components/common/ProductListItem';



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

  renderProducts() {
    const { product } = this.state;
    if (product.data && product.data.length) {
      return product.data.map((item) => (
        <ProductListItem product={item} key={item.id} />
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

