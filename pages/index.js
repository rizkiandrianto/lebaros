
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Head from "../components/layout/Head";
import Header from "../components/layout/Header";
import { commerce } from '../utils/commerce';
import Image from '../components/common/Image';
import Loading from '../public/images/loading.js';
import ProductListItem from '../components/common/ProductListItem';
import Modal from '../components/common/Modal';
import ModalFilter from '../components/common/Modal/ModalFilter';

export default class Home extends Component {
  state = {
    loading: true,
    product: {
      data: []
    },
    modalFilter: false,
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
      sort_order: 'DESC',
      page: 1,
      per_page: 5
    },
    variables: {
      color: [],
      size: [],
      price_range: []
    }
  }

  async componentDidMount() {
    const { query } = this.state;
    this.callData(query);
    findDOMNode(this.scrollWrapper).addEventListener('scroll', this.scrollHandler, true);
  }

  componentWillUnmount() {
    findDOMNode(this.scrollWrapper).removeEventListener('scroll', this.scrollHandler);
  }

  modalSortOperate = this.modalSortOperate.bind(this)
  modalFilterOperate = this.modalFilterOperate.bind(this)
  sort = this.sort.bind(this)
  changeFilter = this.changeFilter.bind(this)
  scrollHandler = this.scrollHandler.bind(this)
  addRef = this.addRef.bind(this)

  scrollHandler(e) {
    const { loading, query, product } = this.state;
    const isScrolled = e.target.scrollTop >= e.target.scrollHeight - (e.target.clientHeight + 200);

    if (!loading && isScrolled && (product.page < product.pages)) {
      this.callData({
        ...query,
        page: product.page + 1
      })
    }
  }

  addRef(e) {
    if (e) this.scrollWrapper = e;
  }

  changeFilter(id) {
    const { variables, query } = this.state;
    const selected_price = variables.price_range.find(price => id == price.id);
    this.setState({
      loading: true,
      modalFilter: false,
      product: {
        data: [],
        page: 1
      }
    }, () => {
      const filterBy = {};
      if (selected_price.price_lt) filterBy.price_lt = selected_price.price_lt;
      if (selected_price.price_gt) filterBy.price_gt = selected_price.price_gt;
      this.callData({
        ...query,
        ...filterBy
      });
    });
  }

  callData() {
    this.setState({
      loading: true
    });
    commerce.products.list().then((res) => {
      this.setState(() => ({
        product: {
          data: res.data
        },
        loading: false
      }));
    });
  }

  modalSortOperate(modalSort = true) {
    return () => {
      this.setState({
        modalSort
      });
    };
  }

  modalFilterOperate(modalFilter = true) {
    return () => {
      this.setState({
        modalFilter
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
    if (loading && !product.data.length) {
      return (
        <div className="container d-flex py-5 my-5 align-items-center justify-content-center">
          <Image width={50} height={50} src={Loading.toString()} />
        </div>
      );
    }

    if (product.data && product.data.length) {
      return (
        <div className="row">
          <div className="col-12">
            {
              product.data.map((item) => (
                <ProductListItem product={item} key={item.id} />
              ))
            }
            {loading && (
              <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center pb-3 mb-5 mt-n5 bg-grey pt-3">
                  <Image width={50} height={50} src={Loading} />
                </div>
              </div>
            )}
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
    const { modalFilter, modalSort, variables } = this.state;
    return (
      <>
        <Head />
        <Header />
        <div className="container main-container" ref={this.addRef}>
          {this.renderProducts()}
        </div>

        <div className="fixed-bottom border-top bg-white filter-footer d-flex align-items-center">
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
                <button
                  onClick={this.modalFilterOperate()}
                  className="btn btn-outline-secondary btn-block"
                >
                  Filter
                </button>
                <Modal
                  className="modal-filter"
                  show={modalFilter}
                  onHide={this.modalFilterOperate(false)}
                >
                  {modalFilter && <ModalFilter onFilter={this.changeFilter} variables={variables} />}
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

