import { Component } from "react";
import ProductBriefView from "./ProductBriefView";
import classes from "./ProductList.module.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const products = this.props.list.map((item, index) => {
      return (
        <li key={index}>
          <ProductBriefView
            product={item}
            currencyIndex={this.props.currencyIndex}
            detailedViewHandler={this.props.detailedViewHandler.bind(this)}
            addItemToCartHandler={this.props.addItemToCartHandler.bind(this)}
          />
        </li>
      );
    });

    return <ul className={classes.productList}>{products}</ul>;
  }
}

export default ProductList;
