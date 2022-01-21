import { Component } from "react";
import CategoryButton from "./CategoryButton";
import classes from "./Header.module.css";
import CartGreen from "../Resources/cartgreen.svg";
import CartEmpty from "../Resources//cartempty.svg";
import Chevron from "../Resources//currencychevron.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonBump: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartArray.length !== this.props.cartArray.length) {
      this.setState((prevState) => {
        return { ...prevState, buttonBump: true };
      });
      setTimeout(() => {
        this.setState((prevState) => {
          return { ...prevState, buttonBump: false };
        });
      }, 150);
    }
  }

  render() {
    const bmpClasses = `${classes.cartNumber} ${
      this.state.buttonBump ? classes.bumpNumber : ""
    }`;

    const chevronClasses = `${classes.chevron} ${
      this.props.currencyMenuVisibility ? classes.chevronFlip : ""
    }`;

    const categories = this.props.categories.map((item, index) => {
      return (
        <CategoryButton category={item.name} key={item.name} index={index} />
      );
    });

    return (
      <div className={classes.header}>
        <nav className={classes.navigation}>{categories}</nav>
        <div className={classes.logo}>
          <img src={CartGreen} alt="cart logo"></img>
        </div>
        <div className={classes.actions}>
          <button
            className={classes.currency}
            onClick={this.props.currencyVisibilityHandler.bind(this)}
          >
            <div className={classes.currencyWrapper}>
              <p className={classes.currencyText}>
                {this.props.currencySymbol}
              </p>
              <img
                src={Chevron}
                alt="currency"
                className={chevronClasses}
              ></img>
            </div>
          </button>
          <button
            className={classes.cart}
            onClick={this.props.miniCartVisibilityHandler.bind(this)}
          >
            <img src={CartEmpty} alt="cart"></img>
            {this.props.cartArray.length > 0 && (
              <div className={bmpClasses}>
                <p>{this.props.cartArray.length}</p>
              </div>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
