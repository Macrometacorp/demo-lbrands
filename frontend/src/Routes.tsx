import React from "react";
import { Route, Switch } from "react-router-dom";
import Checkout from "./modules/checkout/Checkout";
import CheckoutConfirm from "./modules/checkout/CheckoutConfirm";
import Home from "./modules/signup/Home";
import Login from "./modules/signup/Login";
import NotFound from "./modules/notFound/NotFound";
import Signup from "./modules/signup/Signup";
import CategoryView from "./modules/category/CategoryView";
import ShoppingCart from "./modules/cart/ShoppingCart";
import PastPurchases from "./modules/pastPurchases/PastPurchases";
import BestSellers from "./modules/bestSellers/BestSellers";
import SearchView from "./modules/search/SearchView";
import PropsRoute from "./common/PropsRoute";
import ItemDetails from "./modules/itemDetails/ItemDetails";
import LinkItemDetails from "./modules/itemDetails/LinkItemDetails";

interface RouteProps {
  isAuthenticated: boolean;
  userHasAuthenticated: (authenticated: boolean) => void;
  showNetworkLatency: boolean;
}

export const Routes: React.SFC<RouteProps> = (childProps) => (
  <Switch>
    <PropsRoute path="/" exact component={Home} props={childProps} />
    <PropsRoute path="/login" exact component={Login} props={childProps} />
    <PropsRoute path="/signup" exact component={Signup} props={childProps} />
    <Route path="/best" exact component={BestSellers} />
    <Route path="/cart" exact component={ShoppingCart} />
    <PropsRoute
      path="/category/:id"
      exact
      component={CategoryView}
      props={childProps}
    />
    <Route path="/past" exact component={PastPurchases} />
    <Route path="/checkout" exact component={Checkout} />
    <Route path="/checkout-confirm" exact component={CheckoutConfirm} />
    <Route path="/search/:id" exact component={SearchView} />
    <PropsRoute
      path="/details/:id"
      exact
      component={ItemDetails}
      props={childProps}
    />
    <Route path="/gift" exact component={LinkItemDetails} />
    <Route component={NotFound} />
  </Switch>
);
