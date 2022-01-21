import { Component } from "react";
import classes from "./CartProduct.module.css";
import ChevronRight from "../Resources/chevronright.svg";
import ChevronLeft from "../Resources/chevronleft.svg";

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryIndex: 0,
    };
  }

  galleryIndexHandler(action) {
    if (action === "increase") {
      if (this.state.galleryIndex > this.props.product.gallery.length - 2) {
        this.setState((prevState) => {
          return { ...prevState, galleryIndex: 0 };
        });
        return;
      }
      this.setState((prevState) => {
        return { ...prevState, galleryIndex: prevState.galleryIndex + 1 };
      });
    }
    if (action === "decrease") {
      if (this.state.galleryIndex < 1) {
        this.setState((prevState) => {
          return {
            ...prevState,
            galleryIndex: this.props.product.gallery.length - 1,
          };
        });
        return;
      }
      this.setState((prevState) => {
        return { ...prevState, galleryIndex: prevState.galleryIndex - 1 };
      });
    }
  }

  render() {
    const attributes = this.props.product.attributes.map((item, index) => {
      return (
        <div className={classes.attributes} key={index}>
          {item.items.map((lowerItem, index) => {
            return (
              <div
                className={
                  item.type !== "swatch"
                    ? item.selectedItem === index
                      ? classes.attributeSelected
                      : classes.attribute
                    : item.selectedItem === index
                    ? classes.swatchSelected
                    : classes.swatch
                }
                style={{ backgroundColor: lowerItem.displayValue }}
                key={lowerItem.id}
              >
                {item.type !== "swatch" && lowerItem.displayValue}
              </div>
            );
          })}
          <p className={classes.attributeName}> {item.name}</p>
        </div>
      );
    });

    return (
      <div className={classes.main}>
        <div className={classes.info}>
          <p className={classes.brand}>{this.props.product.brand}</p>
          <p className={classes.name}>{this.props.product.name}</p>
          <p className={classes.price}>
            {
              this.props.product.prices[this.props.currencyIndex].currency
                .symbol
            }
            {this.props.product.prices[
              this.props.currencyIndex
            ].amount.toLocaleString()}
          </p>
          {attributes}
        </div>
        <div className={classes.wrapper}>
          <div className={classes.amount}>
            <button
              onClick={() =>
                this.props.modifyCartAmountHandler("add", this.props.index)
              }
            >
              +
            </button>
            <p>{this.props.product.amount}</p>
            <button
              onClick={() =>
                this.props.modifyCartAmountHandler("subtract", this.props.index)
              }
            >
              -
            </button>
          </div>
          <div className={classes.gallery}>
            <img
              src={this.props.product.gallery[this.state.galleryIndex]}
              alt="product"
              className={classes.galleryImage}
            />
            {this.props.product.gallery.length > 1 && (
              <div className={classes.buttonWrapper}>
                <button
                  className={classes.galleryButton}
                  onClick={() => this.galleryIndexHandler("decrease")}
                >
                  <img
                    src={ChevronLeft}
                    className={classes.chevron}
                    alt="left arrow"
                  />
                </button>
                <button
                  className={classes.galleryButton}
                  onClick={() => this.galleryIndexHandler("increase")}
                >
                  <img
                    src={ChevronRight}
                    className={classes.chevron}
                    alt="right arrow"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CartProduct;
