import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import "../../../common/styles/gallery.css";

import bombshell from "../../../images/bestSellers/BombshellBlack.jpeg";
import fleece from "../../../images/bestSellers/CottonFleeceHeatherSnow.jpeg";
import jogger from "../../../images/bestSellers/CottonJoggerPinkHeartDot.jpeg";
import mauvelous from "../../../images/bestSellers/FlowOnMauvelous.jpeg";
import star from "../../../images/bestSellers/FlowOnTealStar.jpeg";
import dust from "../../../images/bestSellers/WirelessLaceBackSageDust.jpeg";

const bestSellers = [bombshell, fleece, jogger, mauvelous, star, dust];

export class BestSellersBar extends React.Component {
  render() {
    return (
      <div className="center ad-gallery nav">
        <div className="col-md-2 hidden-sm hidden-xs">
          <LinkContainer to="/best">
            <NavItem><h3 style={{color:'#ff0000'}}>Fashionstore<br/>Hot Deals</h3></NavItem>
          </LinkContainer>
        </div>
        <div className="row">
          {bestSellers.map(fashionItem =>
            <div className="col-md-2 hidden-sm hidden-xs" key={fashionItem}>
              <LinkContainer to="/best">
                <NavItem><img src={fashionItem} className="thumbs" /></NavItem>
              </LinkContainer>
            </div>)}
        </div>
      </div>
    );
  }
}

export default BestSellersBar;