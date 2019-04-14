import React, { Component } from 'react'

export default class ModalFilter extends Component {
  state = {
    filter: {
      color: [],
      size: [],
      price_range: 0
    }
  }

  changePriceRange = this.changePriceRange.bind(this)
  clickSoon = this.clickSoon.bind(this)
  saveFilter = this.saveFilter.bind(this)
  resetFilter = this.resetFilter.bind(this)

  resetFilter() {
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        price_range: 0
      }
    }));
  }

  saveFilter() {
    const { onFilter } = this.props;
    const { filter } = this.state;
    if (onFilter) onFilter(filter.price_range);
  }

  clickSoon() {
    alert('Pencarian fitur ini belum didukung oleh sistem kami');
  }

  changePriceRange(e) {
    if (e && e.target) {
      const { value } = e.target;
      this.setState(prevState => ({
        filter: {
          ...prevState.filter,
          price_range: value
        }
      }));
    }
  }

  renderOptionsPriceRange() {
    const { variables } = this.props;
    return variables.price_range.map((price, index) => (
      <option
        value={price.id}
        key={index}
      >
        {price.title}
      </option>
    ));
  }

  render() {
    const { variables } = this.props;
    const { filter } = this.state;
    return (
      <div>
        <div className="form-group">
          <label htmlFor="price_range">Rentang Harga</label>
          <select
            onChange={this.changePriceRange}
            className="form-control"
            id="price_range"
            value={filter.price_range}
          >
            {this.renderOptionsPriceRange()}
          </select>
        </div>

        <div className="mb-3">
          <p className="mb-2">Warna</p>
          {variables.color.map((color, index) => (
            <a
              key={index}
              className="color-palette"
              style={{ background: color.colorValue }}
              onClick={this.clickSoon}
            />
          ))}
        </div>

        <div>
          <p className="mb-2">Ukuran</p>
          {variables.size.map((size, index) => (
            <button
              className={`btn
              btn-sm
              btn-outline-secondary
              text-uppercase mr-1 mb-1`}
              key={index}
              onClick={this.clickSoon}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-6 pr-2">
            <button
              className="btn btn-outline-secondary btn-block"
              onClick={this.resetFilter}
            >
              Reset
            </button>
          </div>
          <div className="col-6 pl-2">
            <button
              className="btn btn-primary btn-block"
              onClick={this.saveFilter}
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    );
  }
}
