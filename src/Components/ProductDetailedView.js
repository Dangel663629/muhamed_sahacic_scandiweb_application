import { Component } from "react";
import client from "../GraphQL/backend";
import { productById } from "../GraphQL/queries";
import classes from "./ProductDetailedView.module.css";
import ProductAttribute from "./ProductAttribute";
import { Fragment } from "react/cjs/react.production.min";

class ProductDetailedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryIndex: 0,
      product: { amount: 1 },
      isLoading: true,
      attributes: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: productById,
        variables: {
          searchId: this.props.detailedProductId,
        },
      })
      .then((result) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            product: result.data.product,
            isLoading: false,
          };
        });
      });
  }

  galleryIndexHandler(index) {
    this.setState((prevState) => {
      return { ...prevState, galleryIndex: index };
    });
  }

  attributesArrayHandler(attributeObject) {
    const index = this.state.product.attributes.findIndex(
      (item) => item.id === attributeObject.id
    );
    const helperArray = [...this.state.product.attributes];
    if (index > -1) {
      helperArray[index].selectedItem = attributeObject.selectedItem;
      this.setState((prevState) => {
        return {
          ...prevState,
          product: {
            ...prevState.product,
            attributes: helperArray,
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          ...prevState,
          product: {
            ...prevState.product,
            attributes: [...prevState.product.attributes, attributeObject],
          },
        };
      });
    }
  }

  cartButtonHandler() {
    const product = { ...this.state.product, amount: 1 };
    delete product.description;
    delete product.inStock;
    this.props.addItemToCartHandler(JSON.parse(JSON.stringify(product)));
  }

  render() {
    let buttonString = this.state.product.inStock
      ? "add to cart"
      : "out of stock";

    const gallery = this.state.product.gallery?.map((item, index) => {
      return (
        <img
          src={item}
          className={classes.previewImage}
          key={index}
          alt={this.state.product.name}
          onClick={() => this.galleryIndexHandler(index)}
        />
      );
    });

    const attributes = this.state.product.attributes?.map(
      (attribute, index) => {
        return (
          <ProductAttribute
            attribute={attribute}
            attributesArrayHandler={this.attributesArrayHandler.bind(this)}
            key={index}
          />
        );
      }
    );

    return (
      <Fragment>
        {!this.state.isLoading && (
          <div className={classes.main}>
            <div className={classes.galleryMenu}>{gallery}</div>
            <div className={classes.infoWrapper}>
              <img
                className={classes.mainImage}
                src={this.state.product.gallery[this.state.galleryIndex]}
                alt={this.state.product.name}
              />
              <div className={classes.info}>
                <h1>{this.state.product.brand}</h1>
                <h2>{this.state.product.name}</h2>
                {attributes}
                <p className={classes.price}>Price:</p>
                <p className={classes.priceValue}>
                  {
                    this.state.product.prices[this.props.currencyIndex].currency
                      .symbol
                  }
                  {this.state.product.prices[
                    this.props.currencyIndex
                  ].amount.toLocaleString()}
                </p>
                <button
                  className={classes.cartButton}
                  onClick={this.cartButtonHandler.bind(this)}
                  disabled={!this.state.product.inStock}
                >
                  <p>{buttonString}</p>
                </button>
                <div
                  className={classes.parsedHtmlDescription}
                  dangerouslySetInnerHTML={{
                    __html: this.state.product.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ProductDetailedView;
