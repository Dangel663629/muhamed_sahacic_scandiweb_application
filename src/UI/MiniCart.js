import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./MiniCart.module.css";
import MiniCartProduct from "./MiniCartProduct";
import PropTypes from "prop-types";

class MiniCart extends Component {
  render() {
    const products = this.props.cartArray.map((product, index) => {
      return (
        <MiniCartProduct
          product={product}
          currencyIndex={this.props.currencyIndex}
          modifyCartAmountHandler={this.props.modifyCartAmountHandler.bind(
            this
          )}
          index={index}
          key={index}
        />
      );
    });

    const itemAmount = this.props.cartArray.length.toString();
    const totalPrice =
      Math.round(
        (this.props.cartArray.reduce(
          (acc, item) =>
            acc + item.prices[this.props.currencyIndex].amount * item.amount,
          0
        ) +
          Number.EPSILON) *
          100
      ) / 100;

    return (
      <Fragment>
        {this.props.miniCartVisibility && (
          <div className={classes.miniCart}>
            <p>
              My bag<span>, {itemAmount} items</span>
            </p>
            <div className={classes.list}>{products}</div>
            <div className={classes.total}>
              <p>Total</p>
              <p>
                {this.props.currencySymbol} {totalPrice.toLocaleString()}
              </p>
            </div>
            <div className={classes.buttons}>
              <Link to="/cart">
                <button
                  className={classes.viewbag}
                  onClick={() => this.props.miniCartVisibilityHandler()}
                >
                  <p>view bag</p>
                </button>
              </Link>
              <button className={classes.checkout}>
                <p>check out</p>
              </button>
            </div>
          </div>
        )}
        {this.props.miniCartVisibility && (
          <Fragment>
            <div
              className={classes.overlay}
              onClick={this.props.miniCartVisibilityHandler.bind(this)}
            />
            <div className={classes.overlayTint} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

MiniCart.propTypes = {
  cartArray: PropTypes.array,
  currencyIndex: PropTypes.number,
  modifyCartAmountHandler: PropTypes.func,
  miniCartVisibility: PropTypes.bool,
  currencySymbol: PropTypes.string,
  miniCartVisibilityHandler: PropTypes.func,
};

export default MiniCart;
