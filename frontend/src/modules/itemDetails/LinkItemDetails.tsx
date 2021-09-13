import React from "react";
import CachedIcon from "@material-ui/icons/Cached";
import { Button } from "@material-ui/core";
import { withSnackbar } from "notistack";

import { API, makeBackendUrl } from "../../apiCalls";

import "./details.css";

const COLORS = ["1ee8b7", "d270b7", "bf7c4c"];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface LinkItemDetailsState {
  currentImage: string;
  currentSize: string;
  fashionItem: any;
}

interface ImageDetails {
  image: string;
  name: string;
}

class LinkItemDetails extends React.Component<any, LinkItemDetailsState> {
  [debouncedSuggestions: string]: any;
  constructor(props: any) {
    super(props);
    const {
      params: { id },
    } = this.props.match;

    const {
      promotion,
      promotionSelectionScreenKey,
      baseFashionItemId,
      baseFashionItemCurrentSize,
      baseFashionItemQuantity,
      baseFashionItemColor,
      baseFashionItemPrice,
    } = this.props.location.state;

    this.promotion = promotion;
    this.promotionSelectionScreenKey = promotionSelectionScreenKey;
    this.baseFashionItemId = baseFashionItemId;
    this.baseFashionItemQuantity = baseFashionItemQuantity;
    this.baseFashionItemPrice = baseFashionItemPrice;
    this.baseFashionItemCurrentSize = baseFashionItemCurrentSize;
    this.baseFashionItemColor = baseFashionItemColor;

    this.state = {
      currentImage: "",
      currentSize: "M",
      fashionItem: null,
    };
  }

  async componentDidMount() {
    if (!this.state.fashionItem) {
      const res = await API.get(
        "fashionItem",
        `/fashionItems/${this.promotionSelectionScreenKey}`,
        null
      );
      const item = res[0];
      this.setState({ fashionItem: item, currentImage: item._key });
    }
  }

  getCurrentImageObj(customImage?: string) {
    const imageObj = this.state.fashionItem.images.find(
      (imageDetail: ImageDetails) =>
        imageDetail.image === (customImage || this.state.currentImage)
    );
    return imageObj;
  }

  isOutOfStock(zipcodeObj: any) {
    return !this.getCurrentImageObj()?.availableIn?.find(
      (zipcode: string) => zipcode === zipcodeObj.zipcode
    );
  }

  render() {
    if (!this.state.fashionItem) return null;

    let promotions = (
      <>
        <div>
          <span className="mr-1">
            <strong style={{ textDecoration: "line-through" }}>
              ${this.state.fashionItem.price}
            </strong>
          </span>
        </div>
        <div>
          <strong
            style={{ color: "#af5071", fontWeight: "bolder", opacity: 0.8 }}
          >
            FREE GIFT!
          </strong>
        </div>
      </>
    );

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
            {promotions}
            <p>{this.getCurrentImageObj()?.name}</p>
            {this.state.fashionItem.images.map(
              (imageDetail: ImageDetails, index: number) => {
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
              }
            )}
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
            <Button
              style={{
                minWidth: "245px",
                backgroundColor: "#ef5f96",
                color: "#fff",
                fontWeight: "bolder",
              }}
              variant="contained"
              onClick={() => {
                const { price, _key } = this.state.fashionItem;

                const baseItemPromise = API.post("cart", "/cart", {
                  body: {
                    fashionItemId: this.baseFashionItemId,
                    quantity: this.baseFashionItemQuantity,
                    price: this.baseFashionItemPrice,
                    color: this.baseFashionItemColor.replace(/\s/g, "_"),
                    size: this.baseFashionItemCurrentSize,
                  },
                });

                const giftPromise = API.post("cart", "/cart", {
                  body: {
                    fashionItemId: _key,
                    quantity: 1,
                    price: 0,
                    color: this.getCurrentImageObj()?.name.replace(/\s/g, "_"),
                    size: this.state.currentSize,
                  },
                });

                Promise.all([baseItemPromise, giftPromise]).then(() =>
                  this.props.enqueueSnackbar("Added to Cart!", {
                    variant: "success",
                  })
                );
              }}
            >
              ADD TO BAG
            </Button>
            <p className="detail-returns">
              <CachedIcon />
              <span>Free returns on all U.S. orders.</span>
            </p>
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

export default withSnackbar(LinkItemDetails);
