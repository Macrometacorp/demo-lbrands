import React from "react";
import { API } from "../apiCalls";
import { withSnackbar } from "notistack";
import { Redirect } from "react-router";
import { Glyphicon } from "react-bootstrap";

interface AddToCartProps {
  fashionItemId: string;
  price: number;
  color:string;
  size:string;
  variant?: string;
}

interface AddToCartState {
  loading: boolean;
  toCart: boolean;
  buttonText: string;
}

class AddToCart extends React.Component<any, AddToCartState> {
  [debouncedSuggestions: string]: any;
  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      toCart: false,
      buttonText: `Add to cart`,
    };
  }

  onAddToCart = async () => {
    this.setState({ loading: true });

    API.post("cart", "/cart", {
      body: {
        fashionItemId: this.props.fashionItemId,
        price: this.props.price,
        quantity: 1,
        color:this.props.color,
        size:this.props.size
      },
    }).then(() => {
      this.props.enqueueSnackbar("Added to Cart!", {
        variant: "success",
      })
      this.setState({ loading: false, buttonText: "Added" });
    });
  };

  getVariant = () => {
    let style = "btn btn-black";
    return this.props.variant && this.props.variant === "center"
      ? style + ` btn-black-center`
      : style + ` pull-right`;
  };

  render() {
    // if (this.state.toCart) return <Redirect to="/cart" />;

    return (
      <button
        className={this.getVariant()}
        disabled={this.state.loading}
        type="button"
        onClick={this.onAddToCart}
      >
        {this.state.loading && (
          <Glyphicon glyph="refresh" className="spinning" />
        )}
        {this.props.variant === "buyAgain"
          ? `Buy again`
          : this.state.buttonText}
      </button>
    );
  }
}

export default withSnackbar (AddToCart);
