import React from "react";
import { makeBackendUrl } from "../../apiCalls";

import "./details.css";

interface ItemDetailsState {
  currentImage: string;
}

export class ItemDetails extends React.Component<any, ItemDetailsState> {
  constructor(props: any) {
    super(props);

    const {
      params: { id },
    } = this.props.match;

    this.state = {
      currentImage: makeBackendUrl(`/image/${id}`),
    };
  }

  render() {
    return (
      <section className="mb-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div id="mdb-lightbox-ui"></div>

            <div className="mdb-lightbox">
              <div className="row product-gallery mx-1">
                <div className="col-12 mb-0">
                  <figure className="view overlay rounded z-depth-1 main-img">
                    <a
                      href="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/15a.jpg"
                      data-size="710x823"
                    >
                      <img
                        src={this.state.currentImage}
                        className="img-fluid z-depth-1"
                      />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5>Fantasy T-shirt</h5>
            <p className="mb-2 text-muted text-uppercase small">Shirts</p>
            <ul className="rating">
              <li>
                <i className="fas fa-star fa-sm text-primary"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-primary"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-primary"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-primary"></i>
              </li>
              <li>
                <i className="far fa-star fa-sm text-primary"></i>
              </li>
            </ul>
            <p>
              <span className="mr-1">
                <strong>$12.99</strong>
              </span>
            </p>
            <p className="pt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              sapiente illo. Sit error voluptas repellat rerum quidem, soluta
              enim perferendis voluptates laboriosam. Distinctio, officia quis
              dolore quos sapiente tempore alias.
            </p>
            <div className="table-responsive">
              <table className="table table-sm table-borderless mb-0">
                <tbody>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Model</strong>
                    </th>
                    <td>Shirt 5407X</td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Color</strong>
                    </th>
                    <td>Black</td>
                  </tr>
                  <tr>
                    <th className="pl-0 w-25" scope="row">
                      <strong>Delivery</strong>
                    </th>
                    <td>USA, Europe</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div className="table-responsive mb-2">
              <table className="table table-sm table-borderless">
                <tbody>
                  <tr>
                    <td className="pl-0 pb-0 w-25">Quantity</td>
                    <td className="pb-0">Select size</td>
                  </tr>
                  <tr>
                    <td className="pl-0">
                      <div className="def-number-input number-input safari_only mb-0">
                        <button onClick={() => {}} className="minus"></button>
                        <input
                          className="quantity"
                          min="0"
                          name="quantity"
                          value="1"
                          type="number"
                        />
                        <button onClick={() => {}} className="plus"></button>
                      </div>
                    </td>
                    <td>
                      <div className="mt-1">
                        <div className="form-check form-check-inline pl-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="small"
                            name="materialExampleRadios"
                            checked
                          />
                          <label
                            className="form-check-label small text-uppercase card-link-secondary"
                            htmlFor="small"
                          >
                            Small
                          </label>
                        </div>
                        <div className="form-check form-check-inline pl-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="medium"
                            name="materialExampleRadios"
                          />
                          <label
                            className="form-check-label small text-uppercase card-link-secondary"
                            htmlFor="medium"
                          >
                            Medium
                          </label>
                        </div>
                        <div className="form-check form-check-inline pl-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            id="large"
                            name="materialExampleRadios"
                          />
                          <label
                            className="form-check-label small text-uppercase card-link-secondary"
                            htmlFor="large"
                          >
                            Large
                          </label>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn-primary btn-md mr-1 mb-2">
              Buy now
            </button>
            <button type="button" className="btn btn-light btn-md mr-1 mb-2">
              <i className="fas fa-shopping-cart pr-2"></i>Add to cart
            </button>
          </div>
        </div>
      </section>
    );
  }
}
