import React from "react";
import { API, makeBackendUrl } from "../../apiCalls";
import { FashionItem } from "../bestSellers/BestSellerProductRow";

import "./details.css";

const COLORS = ["1ee8b7", "d270b7", "bf7c4c"];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ItemDetailsState {
  currentImage: string;
  currentSize: string;
  fashionItem: FashionItem;
  quantity: number;
}

export class ItemDetails extends React.Component<any, ItemDetailsState> {
  constructor(props: any) {
    super(props);
    const {
      params: { id },
    } = this.props.match;

    const currentImageId = this.props.location.state._key;

    this.state = {
      currentImage: currentImageId,
      currentSize: "M",
      fashionItem: this.props.location.state,
      quantity: 1,
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
                    <img
                      src={makeBackendUrl(`/image/${this.state.currentImage}`)}
                      className="img-fluid z-depth-1 detail-image"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h5>VICTORIA'S SECRET</h5>
            <h3>{this.state.fashionItem.heading}</h3>
            <p>
              <span className="mr-1">
                <strong>${this.state.fashionItem.price}</strong>
              </span>
            </p>
            <p>
              {
                this.state.fashionItem.images.find(
                  (imageDetail) => imageDetail.image === this.state.currentImage
                )?.name
              }
            </p>
            {this.state.fashionItem.images.map((imageDetail, index) => {
              const { image } = imageDetail;
              const color = COLORS[index];
              const isSelected = this.state.currentImage === image;
              return (
                <div
                  onClick={() => {
                    this.setState({ currentImage: image });
                  }}
                  key={image}
                  style={{
                    backgroundColor: `#${color}`,
                    border: isSelected ? "1px solid black" : "none",
                  }}
                  className="detail-color"
                ></div>
              );
            })}
            <div className="detail-size-container">
              {SIZES.map((size) => {
                const isSelected = this.state.currentSize === size;
                return (
                  <div
                    onClick={() => {
                      this.setState({ currentSize: size });
                    }}
                    key={size}
                    style={{
                      border: isSelected ? "1px solid black" : "none",
                    }}
                  >
                    {size}
                  </div>
                );
              })}
            </div>
            <div className="detail-quantity">
              <button
                onClick={() => {
                  if (this.state.quantity > 1) {
                    this.setState((state) => ({
                      quantity: state.quantity - 1,
                    }));
                  }
                }}
              >
                -
              </button>
              <div>{this.state.quantity}</div>
              <button
                onClick={() => {
                  this.setState((state) => ({
                    quantity: state.quantity + 1,
                  }));
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="detail-cart btn btn-light btn-md mr-1 mb-2"
              onClick={() => {
                const { price, _key } = this.state.fashionItem;
                API.post("cart", "/cart", {
                  body: {
                    fashionItemId: _key,
                    quantity: this.state.quantity,
                    price,
                    color: this.state.fashionItem.images.find(
                      (imageDetail) =>
                        imageDetail.image === this.state.currentImage
                    )?.name,
                    size: this.state.currentSize,
                  },
                });
              }}
            >
              <i className="fas fa-shopping-cart pr-2"></i>ADD TO BAG
            </button>
            <h4>Description</h4>
            <p className="detail-description pt-1">
              {this.state.fashionItem.description}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
