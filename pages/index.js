
import React, { Component } from 'react'
import Head from "../components/layout/Head";
import Header from "../components/layout/Header";
import MarketCloud from '../utils/marketcloud';
import Image from '../components/common/Image';
import Loading from '../static/images/loading.txt';
import ProductListItem from '../components/common/ProductListItem';
import Modal from '../components/common/Modal';



export default class Home extends Component {
  state = {
    loading: true,
    product: {
      data: []
    },
    modalSort: false,
    sort: [{
      title: 'Terbaru',
      sort_by: 'id',
      sort_order: 'DESC'
    }, {
      title: 'Termurah',
      sort_by: 'price',
      sort_order: 'ASC'
    }, {
      title: 'Termahal',
      sort_by: 'price',
      sort_order: 'DESC'
    }],
    query: {
      sort_by: 'id',
      sort_order: 'DESC'
    }
  }

  componentDidMount() {
    const { query } = this.state;
    this.callData(query);
  }

  modalSortOperate = this.modalSortOperate.bind(this)
  sort = this.sort.bind(this)

  callData(param = {}) {
    this.setState({
      loading: true
    });
    MarketCloud.products.list(param).then((res) => {
      this.setState({
        product: res,
        loading: false
      });
    });
  }

  modalSortOperate(modalSort = true) {
    return () => {
      this.setState({
        modalSort
      });
    };
  }

  sort(sort) {
    return () => {
      this.setState(prevState => ({
        modalSort: false,
        loading: true,
        query: {
          ...prevState.query,
          sort_by: sort.sort_by,
          sort_order: sort.sort_order
        }
      }), () => {
        this.callData({
          sort_by: sort.sort_by,
          sort_order: sort.sort_order
        });
      });
    };
  }

  renderProducts() {
    const { product, loading } = this.state;
    if (loading) {
      return (
        <div className="container d-flex py-5 my-5 align-items-center justify-content-center">
          <Image width={50} src={Loading.toString()} />
        </div>
      );
    }

    if (product.data && product.data.length) {
      return (
        <div className="bg-white row">
          <div className="col-12">
            {
              product.data.map((item) => (
                <ProductListItem product={item} key={item.id} />
              ))
            }
          </div>
        </div>
      );
    }

    return (<p className="d-flex align-items-center py-5 justify-content-center">
      Tidak ada Produk
    </p>);
  }

  renderSortable() {
    const { sort, query } = this.state;
    return sort.map((item, index) => (
      <a
        onClick={this.sort(item)}
        key={index}
        className={`d-block ${index !== sort.length - 1 ? 'border-bottom' : ''} py-1`}
      >
        {item.title}
        {
          query.sort_by === item.sort_by && query.sort_order === item.sort_order &&
          <span className="float-right">
            &#10004;
          </span>
        }
      </a>
    ));
  }

  render() {
    const { modalSort } = this.state;
    return (
      <>
        <Head />
        <Header />
        <div className="container main-container">
          {this.renderProducts()}
        </div>
        <div className="fixed-bottom bg-white filter-footer d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <button
                  onClick={this.modalSortOperate()}
                  className="btn btn-outline-secondary btn-block"
                >
                  Urutkan
                </button>
                <Modal show={modalSort} onHide={this.modalSortOperate(false)}>
                  {this.renderSortable()}
                </Modal>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary btn-block">
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

