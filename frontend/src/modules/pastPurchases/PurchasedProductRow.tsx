import React from "react";
import "../../common/styles/productRow.css";
import StarRating from "../../common/starRating/StarRating";
import { API, makeBackendUrl } from "../../apiCalls";
import AddToCart from "../../common/AddToCart";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { FashionItem } from "../bestSellers/BestSellerProductRow";
import { Order } from "../cart/CartProductRow";

interface PurchasedProductRowProps {
  order: Order;
}

interface PurchasedProductRowState {
  fashionItem: any;
}

export class PurchasedProductRow extends React.Component<PurchasedProductRowProps, PurchasedProductRowState> {
  constructor(props: PurchasedProductRowProps) {
    super(props);

    this.state = {
      fashionItem: undefined
    };
  }

  async componentDidMount() {
    try {
      const items = await this.fashionItem(this.props.order);
      const fashionItem = { 
        ...items[0],
        ...this.props.order
      }
      this.setState({ fashionItem });
    } catch (e) {
      console.error(e);
    }
  }

  fashionItem(order: any) {
    return API.get(
      "fashionItems",
      `/fashionItems/${order.fashionItemId}`,
      null
    );
  }

  render() {
    if (!this.state.fashionItem) {
      return (
        <div className="white-box">
          <div className="media">
            <div className="media-left media-middle">
              <div className="loader-no-margin" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img className="media-object product-thumb" 
            src={makeBackendUrl(`/image/${this.state.fashionItem.fashionItemId}`)}
            alt={`${this.state.fashionItem.heading} covers`} />
          </div>
          <div className="media-body">
            <h3 className="media-heading">{this.state.fashionItem.heading}
              <div className="pull-right margin-1">
                <small>{`${this.props.order.quantity} @ ${this.state.fashionItem.price}`}</small>
              </div>
            </h3>
            <small>{this.state.fashionItem.category}</small>
            <div>
              Rating
              <AddToCart fashionItemId={this.state.fashionItem.fashionItemId} price={this.state.fashionItem.price} color={this.state.fashionItem.color} size={this.state.fashionItem.size} variant="buyAgain" />
            </div>
            <StarRating stars={this.state.fashionItem.rating} />
          </div>
        </div>
      </div>
    );
  }
}

export default PurchasedProductRow;


