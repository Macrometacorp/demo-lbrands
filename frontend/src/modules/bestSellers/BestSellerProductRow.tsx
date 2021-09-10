import React from "react";
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
  fashionItem: FashionItem | undefined;
}

export class ProductRow extends React.Component<
  ProductRowProps,
  ProductRowState
> {
  constructor(props: ProductRowProps) {
    super(props);

    this.state = {
      fashionItem: undefined,
    };
  }

  async componentDidMount() {
    try {
      // const fashionItem = await this.getBook();
      this.setState({ fashionItem: this.props.fashionItem });
    } catch (e) {
      console.error(e);
    }
  }

  getBook() {
    return API.get(
      "fashionItems",
      `/fashionItems/${this.props.fashionItemId}`,
      null
    );
  }

  render() {
    if (!this.state.fashionItem) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle no-padding">
            <img
              className="media-object product-thumb"
              src={makeBackendUrl(`/image/${this.state.fashionItem["_key"]}`)}
              alt={`${this.state.fashionItem.heading} cover`}
            />
          </div>
          <div className="media-body  padding-20">
            <h3 className="media-heading">
              {this.state.fashionItem.heading}
              <small className="pull-right margin-1">
                <h4>${this.state.fashionItem.price}</h4>
              </small>
            </h3>
            <p>
              <small>{this.state.fashionItem.category}</small>
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
                  price={this.state.fashionItem.price}
                />
              </span>
            </div>
            <StarRating stars={this.state.fashionItem.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductRow;
