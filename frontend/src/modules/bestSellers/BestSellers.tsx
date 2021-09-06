import React from "react";
import { API } from "../../apiCalls";

import BestSellerProductRow from "./BestSellerProductRow";
import { CategoryNavBar } from "../category/categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";

interface BestSellersProps {}

interface BestSellersState {
  isLoading: boolean;
  // fashionItems: { fashionItemId: any }[];
  fashionItems: {
    _key: string;
    author: string;
    name: string;
    price: number;
    rating: number;
    category: string;
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
      const bestSellers = await API.get("bestsellers", "/bestsellers", null);

      // Map the elasticache results to a book object
      for (var i = 0; i < bestSellers.length; i++) {
        // const fashionItemId = bestSellers[i];
        // fashionItems.push({ fashionItemId });
        const book = bestSellers[i];
        fashionItems.push(book);
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
              <h3>Top 20 best sellers</h3>
            </div>
            {this.state.isLoading ? (
              <div className="loader" />
            ) : (
              this.state.fashionItems
                .slice(0, 20)
                .map((book) => (
                  <BestSellerProductRow
                    fashionItemId={book["_key"]}
                    book={book}
                    key={book["_key"]}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    );
  }
}
