import { Component } from "react";
import classes from "./ProductBriefView.module.css";
import CircleCart from "../Resources/circlecart.svg";
import { Link } from "react-router-dom";

class ProductBriefView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartButtonVisibility: false,
    };
  }

  showCartButton() {
    this.setState(() => {
      return { cartButtonVisibility: true };
    });
  }

  hideCartButton() {
    this.setState(() => {
      return { cartButtonVisibility: false };
    });
  }

  addToCartHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let helperObject = JSON.parse(JSON.stringify(this.props.product));
    helperObject.amount = 1;
    delete helperObject.description;
    delete helperObject.inStock;
    if (helperObject.hasOwnProperty("attributes")) {
      helperObject.attributes.forEach((element) => {
        element.selectedItem = 0;
      });
    }
    this.props.addItemToCartHandler(helperObject);
  }

  productObjectLifter() {
    this.props.detailedViewHandler(this.props.product);
  }

  render() {
    const dynamicUrl = `/product/${this.props.product.id}`;

    return (
      <Link
        to={dynamicUrl}
        style={{ color: "inherit", textDecoration: "inherit" }}
        onClick={this.productObjectLifter.bind(this)}
      >
        <div
          className={classes.body}
          onMouseEnter={this.showCartButton.bind(this)}
          onMouseLeave={this.hideCartButton.bind(this)}
        >
          <div className={classes.productWrapper}>
            <img
              src={this.props.product.gallery[0]}
              className={classes.productImage}
            />
            {!this.props.product.inStock && (
              <div className={classes.stockOverlay}>
                <p>OUT OF STOCK</p>
              </div>
            )}
            {this.state.cartButtonVisibility && this.props.product.inStock && (
              <button
                className={classes.cartButton}
                onClick={this.addToCartHandler.bind(this)}
              >
                <img
                  src={CircleCart}
                  alt="cart button"
                  className={classes.cartlogo}
                ></img>
              </button>
            )}
          </div>
          <div className={classes.info}>
            <p>
              {this.props.product.brand} {this.props.product.name}
            </p>
            <h4>
              {
                this.props.product.prices[this.props.currencyIndex].currency
                  .symbol
              }
              {this.props.product.prices[
                this.props.currencyIndex
              ].amount.toLocaleString()}
            </h4>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductBriefView;
