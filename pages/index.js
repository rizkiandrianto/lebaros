
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'next/router';
import Head from "../components/layout/Head";
import Header from "../components/layout/Header";
import Image from '../components/common/Image';
import Loading from '../public/images/loading.js';
import ProductListItem from '../components/common/ProductListItem';
import Modal from '../components/common/Modal';
// import ModalFilter from '../components/common/Modal/ModalFilter';
import locale from '../utils/locale';

const DEFAULT_QUERY = {
  page: 0,
  hitsPerPage: 3
};
class Home extends Component {
  // static async getInitialProps(ctx) {
  //   const host = new URL(ctx?.req?.headers?.referer)?.origin;
  //   console.log(ctx.req?.headers?.host);
  //   return {
  //     products: await fetch(`${host}/api/products?hitsPerPage=3`)
  //       .then(res => res.json())
  //   }
  // }

  constructor(props) {
    super(props);
    const { router, products } = props;
    this.state = {
      loading: false,
      product: products,
      modalFilter: false,
      modalSort: false,
      sort: [{
        title: locale.latest[router.locale],
        sort_by: null,
        sort_order: null
      }, {
        title: locale.cheapest[router.locale],
        sort_by: 'price',
        sort_order: 'ASC'
      }, {
        title: locale.expensive[router.locale],
        sort_by: 'price',
        sort_order: 'DESC'
      }],
      query: {
        sort_by: null,
        sort_order: null
      },
      variables: {
        color: [],
        size: [],
        price_range: []
      }
    }
  }

  async componentDidMount() {
    const { query } = this.state;
    findDOMNode(this.scrollWrapper).addEventListener('scroll', this.scrollHandler, true);
    this.callData({
      ...query,
      ...DEFAULT_QUERY
    });
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

  callData(param = {}) {
    this.setState({
      loading: true
    });
    const { sort_by: sort, sort_order: order } = param;
    const { product } = this.state;
    var url = new URL(`${window.location.origin}/api/products`);
    const finalParam = {
      sort,
      order,
      page: param.page,
      hitsPerPage: param.hitsPerPage || product.hitsPerPage
    };

    Object.keys(finalParam).forEach(key => {
      if (finalParam[key]) url.searchParams.append(key, finalParam[key]);
    });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState(prevState => ({
          loading: false,
          product: {
            ...res,
            hits: [
              ...prevState.product?.hits || [],
              ...res.hits
            ]
          }
        }));
      });
  }

  scrollHandler(e) {
    const { loading, query, product } = this.state;
    const isScrolled = e.target.scrollTop >= e.target.scrollHeight - (e.target.clientHeight + 300);

    if (!loading && isScrolled && (product.nbPages !== product.page + 1)) {
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
        hits: [],
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
        },
        product: {
          hits: [],
        }
      }), () => {
        this.callData({
          sort_by: sort.sort_by,
          sort_order: sort.sort_order,
          ...DEFAULT_QUERY
        });
      });
    };
  }

  renderProducts() {
    const { product, loading } = this.state;
    const { router } = this.props;
    if (loading && !product?.hits?.length) {
      return (
        <div className="container d-flex py-5 my-5 align-items-center justify-content-center">
          <Image width={50} height={50} src={Loading.toString()} />
        </div>
      );
    }

    if (product?.hits?.length) {
      return (
        <div className="row">
          <div className="col-12">
            {
              product.hits.map((item) => (
                <ProductListItem product={item} key={item.id} />
              ))
            }
            {loading && (
              <div className="container-fluid">
                <div className="row d-flex align-items-center justify-content-center pt-3 mb-4 bg-grey">
                  <Image width={50} height={50} src={Loading} />
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (<p className="d-flex align-items-center py-5 justify-content-center text-capitalize">
      {locale.noProduct[router.locale]}
    </p>);
  }

  renderSortable() {
    const { sort, query } = this.state;
    return sort.map((item, index) => (
      <a
        onClick={this.sort(item)}
        key={index}
        className={`d-block text-capitalize ${index !== sort.length - 1 ? 'border-bottom' : ''} py-1`}
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
    const { router } = this.props;
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
              <div className="col-12 col-md-6 offset-md-3">
                <button
                  onClick={this.modalSortOperate()}
                  className="btn btn-outline-secondary btn-block text-capitalize"
                >
                  {locale.sort[router.locale]}
                </button>
                <Modal show={modalSort} onHide={this.modalSortOperate(false)}>
                  {this.renderSortable()}
                </Modal>
              </div>
              {/* <div className="col-6">
                <button
                  onClick={this.modalFilterOperate()}
                  className="btn btn-outline-secondary btn-block text-capitalize"
                >
                  {locale.filter[router.locale]}
                </button>
                <Modal
                  className="modal-filter"
                  show={modalFilter}
                  onHide={this.modalFilterOperate(false)}
                >
                  {modalFilter && <ModalFilter onFilter={this.changeFilter} variables={variables} />}
                </Modal>
              </div> */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Home)