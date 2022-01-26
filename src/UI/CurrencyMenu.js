import { Component, Fragment } from "react";
import client from "../GraphQL/backend";
import { getCurrencies } from "../GraphQL/queries";
import classes from "./CurrencyMenu.module.css";
import PropTypes from "prop-types";

class CurrencyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: getCurrencies,
      })
      .then((result) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            currencies: result.data.currencies,
          };
        });
      });
  }

  currencySelectHandler(index) {
    this.props.currencyIndexHandler(index);
    this.props.currencySymbolHandler(this.state.currencies[index].symbol);
    this.props.currencyVisibilityHandler();
  }

  render() {
    const currencies = this.state.currencies.map((item, index) => {
      return (
        <button key={index} onClick={() => this.currencySelectHandler(index)}>
          {item.symbol} {item.label}
        </button>
      );
    });

    return (
      <Fragment>
        <div className={classes.currencyMenu}>{currencies}</div>
        <div
          className={classes.overlay}
          onClick={this.props.currencyVisibilityHandler.bind(this)}
        ></div>
      </Fragment>
    );
  }
}

CurrencyMenu.propTypes = {
  currencyIndexHandler: PropTypes.func,
  currencySymbolHandler: PropTypes.func,
  currencyVisibilityHandler: PropTypes.func,
};

export default CurrencyMenu;
