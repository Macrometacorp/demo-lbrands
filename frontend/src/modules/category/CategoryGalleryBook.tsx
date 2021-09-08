import React from "react";
import "../../common/styles/gallery.css";
import StarRating from "../../common/starRating/StarRating";
import AddToCart from "../../common/AddToCart";
import { FashionItem } from "../bestSellers/BestSellerProductRow";
import { makeBackendUrl } from "../../apiCalls";
import { LinkContainer } from "react-router-bootstrap";

interface CategoryGalleryBookProps {
  fashionItem: FashionItem;
}

export class CategoryGalleryBook extends React.Component<CategoryGalleryBookProps> {
  render() {
    if (!this.props.fashionItem) return;
    return (
      <div className="col-sm-3 col-md-3">
        <LinkContainer to={`/details/${this.props.fashionItem._key}`}>
          <div className="thumbnail no-border">
            <p className="rating-container">
              <StarRating stars={this.props.fashionItem.rating} />
              <span className="pull-right">{`$${this.props.fashionItem.price}`}</span>
            </p>
            <img
              style={{ height: "200px", width: "150px" }}
              src={makeBackendUrl(`/image/${this.props.fashionItem["_key"]}`)}
              alt={`${this.props.fashionItem.heading} cover`}
            />
            <div className="caption">
              <h4 className="text-center wrap-text">
                {this.props.fashionItem.heading}
              </h4>
              {/* <AddToCart
                fashionItemId={this.props.fashionItem["_key"]}
                price={this.props.fashionItem.price}
                variant="center"
              /> */}
            </div>
          </div>
        </LinkContainer>
      </div>
    );
  }
}

export default CategoryGalleryBook;
