import React, { Component, useEffect, useState } from "react";
import { CategoryNavBar } from "./categoryNavBar/CategoryNavBar";
import { SearchBar } from "../search/searchBar/SearchBar";
import { BestSellersBar } from "../bestSellers/bestSellersBar/BestSellersBar";
import { CategoryGallery } from "./CategoryGallery";

import sleep from "../../images/hero/hero-sleep.jpg";
import sport from "../../images/hero/hero-sport.jpg";
import lingerie from "../../images/hero/hero-lingerie.jpg";
import swim from "../../images/hero/hero-swim.jpg";
import panty from "../../images/hero/hero-panty.jpg";
import bra from "../../images/hero/hero-bra.jpg";

import "../../common/hero/hero.css";
import { categories } from "./categoryNavBar/categories";
import EnhancedTable from "../../common/table/EnhancedTable";

interface CategoryViewProps {
  match: any;
  showNetworkLatency: boolean;
}
interface CategoryViewState {
  apiValue: [];
}

const CategoryView = (props: CategoryViewProps) => {
  const [apiValue, setApiValue] = useState([]);
  useEffect(() => {
    const values = sessionStorage.getItem("responseTime") || "[]";
    const responseTimeValue = JSON.parse(values);
    setApiValue(responseTimeValue);
  }, [props.showNetworkLatency]);

  const getImage = () => {
    switch (props.match.params.id) {
      case categories.lingerie:
        return lingerie;
      case categories.sleep:
        return sleep;
      case categories.swim:
        return swim;
      case categories.bras:
        return bra;
      case categories.panties:
        return panty;
      case categories.sport:
        return sport;
      default:
        return lingerie;
    }
  };
  return (
    <div className="Category">
      <CategoryNavBar />
      {props.showNetworkLatency ? (
        <EnhancedTable
          networkapis={apiValue.reverse()}
          tableHeading="API Calls and Performance"
        />
      ) : (
        <img
          src={getImage()}
          alt={`${getImage()} hero`}
          className="img-fluid full-width top-hero-padding"
        />
      )}
      <BestSellersBar />
      <CategoryGallery match={props.match} />
    </div>
  );
};
export default CategoryView;
