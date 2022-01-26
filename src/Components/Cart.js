import { Component, Fragment } from "react";
import classes from "./Cart.module.css";
import CartProduct from "./CartProduct";
import PropTypes from "prop-types";

class Cart extends Component {
  render() {
    const products = this.props.cartArray.map((product, index) => {
      return (
        <CartProduct
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

    return (
      <Fragment>
        <h1 className={classes.title}>Cart</h1>
        {this.props.cartArray.length < 1 && <h2>Cart is empty...</h2>}
        <div className={classes.main}>{products}</div>
      </Fragment>
    );
  }
}

Cart.propTypes = {
  cartArray: PropTypes.array,
  currencyIndex: PropTypes.number,
  modifyCartAmountHandler: PropTypes.func,
};

export default Cart;
