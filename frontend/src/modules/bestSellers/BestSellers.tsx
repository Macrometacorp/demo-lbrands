import React from "react";
import { API } from "../../apiCalls";

import BestSellerProductRow from "./BestSellerProductRow";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";

interface BestSellersProps {}

interface BestSellersState {
  isLoading: boolean;
  fashionItems: {
    _key: string;
    message: string;
    type: "price" | "link";
    price?: number;
    link?: string;
  }[];
}

export default class BestSellers extends React.Component<
  BestSellersProps,
  BestSellersState
> {
  constructor(props: BestSellersProps) {
    super(props);

    this.state = {
      isLoading: true,
      fashionItems: [],
    };
  }

  async componentDidMount() {
    try {
      const fashionItems = [];
      const bestSellers = await API.get("hotdeals", "/hot", null);

      // Map the elasticache results to a fashionItem object
      for (var i = 0; i < bestSellers.length; i++) {
        // const fashionItemId = bestSellers[i];
        // fashionItems.push({ fashionItemId });
        const fashionItem = bestSellers[i];
        fashionItems.push(fashionItem);
      }
      this.setState({
        fashionItems: fashionItems,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="Category">
        <CategoryNavBar />
        <div>
          <div className="well-bs no-radius">
            <div className="container-category">
              <h3>Hot Deals</h3>
            </div>
            {this.state.isLoading ? (
              <div className="loader" />
            ) : (
              this.state.fashionItems
                .slice(0, 20)
                .map((fashionItem) => (
                  <BestSellerProductRow
                    fashionItemId={fashionItem["_key"]}
                    fashionItem={fashionItem}
                    key={fashionItem["_key"]}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
