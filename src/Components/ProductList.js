import { Component, Fragment } from "react";
import client from "../GraphQL/backend";
import { categoryByName } from "../GraphQL/queries";
import ProductBriefView from "./ProductBriefView";
import classes from "./ProductList.module.css";
import PropTypes from "prop-types";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      isLoading: true,
    };
  }

  queryCall() {
    client
      .query({
        query: categoryByName,
        variables: {
          titleString: this.props.currentCategory,
        },
      })
      .then((result) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            productList: result.data.category.products,
          };
        });
      });
  }

  componentDidMount() {
    this.queryCall();
    this.setState(() => {
      return { isLoading: false };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.queryCall();
    }
  }

  render() {
    const products = this.state.productList.map((item, index) => {
      return (
        <li key={index}>
          <ProductBriefView
            product={item}
            currencyIndex={this.props.currencyIndex}
            detailedProductIdHandler={this.props.detailedProductIdHandler}
            addItemToCartHandler={this.props.addItemToCartHandler.bind(this)}
          />
        </li>
      );
    });

    return (
      <Fragment>
        <h1>{this.props.currentCategory}</h1>
        {this.state.isLoading ? (
          <h2>Loading products...</h2>
        ) : (
          <ul className={classes.productList}>{products}</ul>
        )}
      </Fragment>
    );
  }
}

ProductList.propTypes = {
  currentCategory: PropTypes.string,
  currencyIndex: PropTypes.number,
  detailedProductIdHandler: PropTypes.func,
  addItemToCartHandler: PropTypes.func,
};

export default ProductList;
