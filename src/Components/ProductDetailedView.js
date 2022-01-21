import { Component } from "react";
import classes from "./ProductDetailedView.module.css";
import ProductAttribute from "./ProductAttribute";

class ProductDetailedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryIndex: 0,
      finalProduct: {
        id: this.props.product.id,
        name: this.props.product.name,
        brand: this.props.product.brand,
        prices: this.props.product.prices,
        gallery: this.props.product.gallery,
        attributes: [],
        amount: 1,
      },
    };
  }

  galleryIndexHandler(index) {
    this.setState((prevState) => {
      return { ...prevState, galleryIndex: index };
    });
  }

  attributesArrayHandler(attributeObject) {
    const index = this.state.finalProduct.attributes.findIndex(
      (item) => item.id === attributeObject.id
    );
    const helperArray = [...this.state.finalProduct.attributes];
    if (index > -1) {
      helperArray[index].selectedItem = attributeObject.selectedItem;
      this.setState((prevState) => {
        return {
          ...prevState,
          finalProduct: {
            ...prevState.finalProduct,
            attributes: helperArray,
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          finalProduct: {
            ...prevState.finalProduct,
            attributes: [...prevState.finalProduct.attributes, attributeObject],
          },
        };
      });
    }
  }

  cartButtonHandler() {
    this.props.addItemToCartHandler(
      JSON.parse(JSON.stringify(this.state.finalProduct))
    );
  }

  render() {
    let buttonString = this.props.product.inStock
      ? "add to cart"
      : "out of stock";

    const gallery = this.props.product.gallery.map((item, index) => {
      return (
        <img
          src={item}
          className={classes.previewImage}
          key={index}
          alt={this.props.product.name}
          onClick={() => this.galleryIndexHandler(index)}
        />
      );
    });

    const attributes = this.props.product.attributes.map((attribute, index) => {
      return (
        <ProductAttribute
          attribute={attribute}
          attributesArrayHandler={this.attributesArrayHandler.bind(this)}
          key={index}
        />
      );
    });

    return (
      <div className={classes.main}>
        <div className={classes.galleryMenu}>{gallery}</div>
        <div className={classes.infoWrapper}>
          <img
            className={classes.mainImage}
            src={this.props.product.gallery[this.state.galleryIndex]}
            alt={this.props.product.name}
          />
          <div className={classes.info}>
            <h1>{this.props.product.brand}</h1>
            <h2>{this.props.product.name}</h2>
            {attributes}
            <p className={classes.price}>Price:</p>
            <p className={classes.priceValue}>
              {
                this.props.product.prices[this.props.currencyIndex].currency
                  .symbol
              }
              {this.props.product.prices[
                this.props.currencyIndex
              ].amount.toLocaleString()}
            </p>
            <button
              className={classes.cartButton}
              onClick={this.cartButtonHandler.bind(this)}
              disabled={!this.props.product.inStock}
            >
              <p>{buttonString}</p>
            </button>
            <div
              className={classes.parsedHtmlDescription}
              dangerouslySetInnerHTML={{
                __html: this.props.product.description,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetailedView;
