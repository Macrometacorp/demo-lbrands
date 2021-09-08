import React from "react";
import "../../common/styles/productRow.css";
import { API, makeBackendUrl } from "../../apiCalls";
import StarRating from "../../common/starRating/StarRating";
import FriendRecommendations from "../../common/friendRecommendations/FriendRecommendations";
import { Glyphicon } from "react-bootstrap";
import { FashionItem } from "../bestSellers/BestSellerProductRow";

export interface Order {
  fashionItemId: string;
  quantity: number;
  price: number;
}

interface CartProductRowProps {
  order: Order | any;
  fashionItem: any;
  calculateTotal: () => void;
}

interface CartProductRowState {
  fashionItem: FashionItem | undefined;
  removeLoading: boolean;
}

export class CartProductRow extends React.Component<
  CartProductRowProps,
  CartProductRowState
> {
  constructor(props: CartProductRowProps) {
    super(props);

    this.state = {
      fashionItem: undefined,
      removeLoading: false,
    };
  }

  async componentDidMount() {
    try {
      // const fashionItem = this.getBook(this.props.order);
      const fashionItem = this.props.fashionItem;
      this.setState({ fashionItem });
    } catch (e) {
      console.error(e);
    }
  }

  // getBook(order: any) {
  //   return API.get("fashionItems", `/fashionItems/${order.fashionItemId}`, null);
  // }

  onRemove = async () => {
    this.setState({ removeLoading: true });
    await API.del("cart", "/cart", {
      body: {
        fashionItemId: this.props.order.fashionItemId,
      },
    });

    this.props.calculateTotal();
  };

  onQuantityUpdated = async (event: any) => {
    await API.put("cart", "/cart", {
      body: {
        fashionItemId: this.props.order.fashionItemId,
        quantity: parseInt(event.target.value, 10),
      },
    });
  };

  render() {
    if (!this.state.fashionItem) return null;

    return (
      <div className="white-box">
        <div className="media">
          <div className="media-left media-middle">
            <img
              className="media-object product-thumb"
              src={makeBackendUrl(`/image/${this.state.fashionItem["_key"]}`)}
              alt={`${this.state.fashionItem.heading} cover`}
            />
          </div>
          <div className="media-body">
            <h3 className="media-heading">
              {this.state.fashionItem.heading}
              <div className="pull-right margin-1">
                <small>${this.state.fashionItem.price}</small>
              </div>
            </h3>
            <p>
              <small>{this.state.fashionItem.category}</small>
            </p>
            {/* <FriendRecommendations fashionItemId={this.props.order.fashionItemId} /> */}
            <div>
              Rating
              <div className="pull-right">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control product-quantity-input-style"
                    placeholder="Quantity"
                    defaultValue={this.props.order.quantity.toString()}
                    onChange={this.onQuantityUpdated}
                    min={1}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-black"
                      type="button"
                      onClick={this.onRemove}
                      disabled={this.state.removeLoading}
                    >
                      {this.state.removeLoading && (
                        <Glyphicon glyph="refresh" className="spinning" />
                      )}
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <p>
              <StarRating stars={this.state.fashionItem.rating} />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartProductRow;
