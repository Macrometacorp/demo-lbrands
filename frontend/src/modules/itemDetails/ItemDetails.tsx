import React from "react";
import Modal from "react-modal";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import CachedIcon from "@material-ui/icons/Cached";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  Divider,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";

import { debounce } from "lodash";

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
  isModalOpen: boolean;
  zipcode: string;
  zipcodeSuggestion: any;
  selectedStore: any;
}

interface ImageDetails {
  image: string;
  name: string;
}

export class ItemDetails extends React.Component<any, ItemDetailsState> {
  [debouncedSuggestions: string]: any;
  constructor(props: any) {
    super(props);
    const {
      params: { id },
    } = this.props.match;

    const { item, promotion } = this.props.location.state;
    const currentImageId = item._key;

    this.fashionItem = item;
    this.promotion = promotion;

    this.state = {
      currentImage: currentImageId,
      currentSize: "M",
      fashionItem: item,
      quantity: 1,
      isModalOpen: false,
      zipcode: "",
      zipcodeSuggestion: null,
      selectedStore: null,
    };

    this.debouncedSuggestions = debounce(async () => {
      if (this.state.zipcode) {
        const key = parseInt(this.state.zipcode[0], 10);
        if (key === key) {
          const res = await API.get("suggestion", `/suggestion/${key}`, null);
          this.setState({ zipcodeSuggestion: res[0] });
        }
      }
    }, 100);
    this.debouncedSuggestions = this.debouncedSuggestions.bind(this);
  }

  getCurrentImageObj() {
    const imageObj = this.fashionItem.images.find(
      (imageDetail: ImageDetails) =>
        imageDetail.image === this.state.currentImage
    );
    return imageObj;
  }

  isOutOfStock(zipcodeObj: any) {
    return !this.getCurrentImageObj()?.availableIn?.find(
      (zipcode: string) => zipcode === zipcodeObj.zipcode
    );
  }

  render() {
    let promotions;

    if (this.promotion) {
      const { type, message } = this.promotion;
      if (type === "price") {
        promotions = (
          <>
            <div>
              <span className="mr-1">
                <strong style={{ textDecoration: "line-through" }}>
                  ${this.fashionItem.price}
                </strong>
              </span>
            </div>
            <div>
              <strong
                style={{ color: "#af5071", fontWeight: "bolder", opacity: 0.8 }}
              >
                {message}
              </strong>
            </div>
          </>
        );
      } else if (type === "link") {
      }
    } else {
      promotions = (
        <p>
          <span className="mr-1">
            <strong>${this.fashionItem.price}</strong>
          </span>
        </p>
      );
    }

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
            <h3>{this.fashionItem.heading}</h3>
            {promotions}
            <p>{this.getCurrentImageObj()?.name}</p>
            {this.fashionItem.images.map(
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
                const { price, _key } = this.fashionItem;
                API.post("cart", "/cart", {
                  body: {
                    fashionItemId: _key,
                    quantity: this.state.quantity,
                    price: this?.promotion?.price || price,
                    color: this.getCurrentImageObj()?.name,
                    size: this.state.currentSize,
                  },
                });
              }}
            >
              ADD TO BAG
            </button>
            <p className="detail-returns">
              <CachedIcon />
              <span>Free returns on all U.S. orders.</span>
            </p>
            <button
              type="button"
              className="detail-location btn btn-light btn-md"
              onClick={() => {
                this.setState({ isModalOpen: true });
              }}
            >
              {this.state.selectedStore ? (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "row",
                    fontSize: "10px",
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{this.state.selectedStore.zipcode}</div>
                    <div>{this.state.selectedStore.storeName}</div>
                    <div>{this.state.selectedStore.contact}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ textDecoration: "underline" }}>
                      Select Another Store
                    </span>
                    {this.isOutOfStock(this.state.selectedStore) && (
                      <span>Out Of Stock</span>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <LocationOnIcon style={{ fontSize: "18px" }} />
                  <strong>Find it near you</strong>
                </>
              )}
            </button>
            <Modal
              isOpen={this.state.isModalOpen}
              style={{
                content: {
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                },
              }}
              contentLabel="Store Availability"
            >
              <div className="detail-modal-heading">
                <h2>Store Availability</h2>
                <span
                  onClick={() => {
                    this.setState({ isModalOpen: false });
                  }}
                >
                  <CloseIcon style={{ fontSize: "24px" }} />
                </span>
              </div>
              <Divider />
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <SearchIcon />
                </Grid>
                <Grid item>
                  <TextField
                    id="input-with-icon-grid"
                    label="Zip Code"
                    style={{ width: "350px" }}
                    onChange={(event) => {
                      const zipcode = event.target.value;
                      this.setState({ zipcode }, this.debouncedSuggestions);
                    }}
                  />
                </Grid>
              </Grid>
              <List>
                {this.state.zipcodeSuggestion?.zipcodes.map(
                  (zipcodeObj: any) => {
                    const isStoreSelected =
                      this.state?.selectedStore?.zipcode ===
                      zipcodeObj?.zipcode;
                    return (
                      <ListItem key={zipcodeObj.zipcode}>
                        <ListItemText
                          primary={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <span>
                                {zipcodeObj.zipcode}, {zipcodeObj.storeName},{" "}
                                {this.state.zipcodeSuggestion.county}
                              </span>

                              <div style={{ display: "flex" }}>
                                <span
                                  style={{
                                    paddingRight: "5px",
                                    color: "rgba(0, 0, 0, 0.54)",
                                  }}
                                >
                                  {this.isOutOfStock(zipcodeObj)
                                    ? "Out of stock"
                                    : "Available"}
                                </span>
                                {this.isOutOfStock(zipcodeObj) ? (
                                  <CancelIcon color="disabled" />
                                ) : (
                                  <CheckCircleIcon color="disabled" />
                                )}
                              </div>
                            </div>
                          }
                          secondary={
                            <React.Fragment>
                              <div>{zipcodeObj.contact}</div>
                              <div>Closes {zipcodeObj.closeTime}</div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div style={{ color: "black" }}>
                                  {zipcodeObj.additionalDetails}
                                </div>
                                <Button
                                  onClick={() => {
                                    this.setState({
                                      selectedStore: zipcodeObj,
                                      isModalOpen: false,
                                    });
                                  }}
                                  variant={
                                    isStoreSelected ? "contained" : "outlined"
                                  }
                                  color="primary"
                                >
                                  {isStoreSelected
                                    ? "Selected"
                                    : "Select Store"}
                                </Button>
                              </div>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    );
                  }
                )}
              </List>
            </Modal>
            <h4>Description</h4>
            <p className="detail-description pt-1">
              {this.fashionItem.description}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
