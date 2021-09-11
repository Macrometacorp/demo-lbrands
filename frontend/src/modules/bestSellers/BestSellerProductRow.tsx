import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { API, makeBackendUrl } from "../../apiCalls";

import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import StarRating from "../../common/starRating/StarRating";
import "../../common/styles/productRow.css";

interface ProductRowProps {
  fashionItemId: string;
  fashionItem: FashionItem;
}

export interface FashionItem {
  _key: string;
  price: number;
  category: string;
  heading: string;
  rating: number;
  images: Array<{ image: string; name: string; availableIn?: Array<string> }>;
  description: string;
}

interface ProductRowState {
  fashionItemDetails: FashionItem | undefined;
}

export class ProductRow extends React.Component<
  ProductRowProps,
  ProductRowState
> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = {
      fashionItemDetails: undefined,
    };
  }

  async componentDidMount() {
    try {
      const fashionItemDetails = await this.getFashionItem();
      this.setState({ fashionItemDetails: fashionItemDetails[0] });
    } catch (e) {
      console.error(e);
    }
  }

  getFashionItem() {
    return API.get(
      "fashionItems",
      `/fashionItems/${this.props.fashionItemId}`,
      null
    );
  }

  render() {
    if (!this.state.fashionItemDetails) return null;

    return (
      <LinkContainer
        to={{
          pathname: `/details/${this.state.fashionItemDetails.heading}`,
          state: this.state.fashionItemDetails,
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="white-box">
          <div className="media">
            <div className="media-left media-middle no-padding">
              <img
                className="media-object product-thumb"
                src={makeBackendUrl(
                  `/image/${this.state.fashionItemDetails["_key"]}`
                )}
                alt={`${this.state.fashionItemDetails.heading} cover`}
              />
            </div>
            <div className="media-body  padding-20">
              <h3 className="media-heading">
                {this.state.fashionItemDetails.heading}
                <small className="pull-right margin-1">
                  <h4>${this.state.fashionItemDetails.price}</h4>
                </small>
              </h3>
              <p>
                <small>{this.state.fashionItemDetails.category}</small>
              </p>
              {/*ABHISHEK*/}
              {/* <FriendRecommendations fashionItemId={this.props.fashionItemId} /> */}
              <div>
                <span
                  style={{
                    display: "block",
                  }}
                >
                  Rating
                </span>
                <span>
                  <AddToCart
                    fashionItemId={this.props.fashionItemId}
                    price={this.state.fashionItemDetails.price}
                  />
                </span>
              </div>
              <StarRating stars={this.state.fashionItemDetails.rating} />
            </div>
          </div>
        </div>
      </LinkContainer>
    );
  }
}

export default ProductRow;
