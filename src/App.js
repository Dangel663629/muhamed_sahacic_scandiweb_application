import { Component } from "react";
import client from "./GraphQL/backend";
import { getCategories } from "./GraphQL/queries";
import Header from "./UI/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
import CurrencyMenu from "./UI/CurrencyMenu";
import ProductDetailedView from "./Components/ProductDetailedView";
import classes from "./App.module.css";
import MiniCart from "./UI/MiniCart";
import Cart from "./Components/Cart";

class App extends Component {
  constructor(props) {
    const localStorageCartArray = localStorage.getItem("cartArray");
    const localStorageCurrencyIndex = localStorage.getItem("currencyIndex");
    const localStorageCurrencySymbol = localStorage.getItem("currencySymbol");
    const localStorageDetailedProduct = localStorage.getItem("detailedProduct");

    super(props);
    this.state = {
      isLoading: true,
      categories: [],
      currencyMenuVisibility: false,
      currencyIndex: localStorageCurrencyIndex ? localStorageCurrencyIndex : 0,
      currencySymbol: localStorageCurrencySymbol
        ? localStorageCurrencySymbol
        : "$",
      detailedProduct: localStorageDetailedProduct
        ? JSON.parse(localStorageDetailedProduct)
        : {},
      miniCartVisibility: false,
      cartArray: localStorageCartArray ? JSON.parse(localStorageCartArray) : [],
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.cartArray !== this.state.cartArray) {
      localStorage.setItem("cartArray", JSON.stringify(this.state.cartArray));
    }
    if (
      prevState.currencyIndex !== this.state.currencyIndex ||
      prevState.currencySymbol !== this.state.currencySymbol
    ) {
      localStorage.setItem("currencyIndex", this.state.currencyIndex);
      localStorage.setItem("currencySymbol", this.state.currencySymbol);
    }
    if (prevState.detailedProduct !== this.state.detailedProduct) {
      localStorage.setItem(
        "detailedProduct",
        JSON.stringify(this.state.detailedProduct)
      );
    }
  }

  componentDidMount() {
    client
      .query({
        query: getCategories,
      })
      .then((result) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            categories: result.data.categories,
          };
        });
        this.setState({ isLoading: false });
      });
  }

  currencyVisibilityHandler() {
    this.setState((prevState) => {
      return {
        ...prevState,
        currencyMenuVisibility: !prevState.currencyMenuVisibility,
      };
    });
  }

  currencyIndexHandler(newIndex) {
    this.setState((prevState) => {
      return {
        ...prevState,
        currencyIndex: newIndex,
      };
    });
  }

  currencySymbolHandler(newSymbol) {
    this.setState((prevState) => {
      return {
        ...prevState,
        currencySymbol: newSymbol,
      };
    });
  }

  detailedViewHandler(product) {
    this.setState((prevState) => {
      return { ...prevState, detailedProduct: product };
    });
  }

  miniCartVisibilityHandler() {
    if (this.state.cartArray.length < 1) {
      alert("Cart is empty, add items to view!");
      return;
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        miniCartVisibility: !prevState.miniCartVisibility,
      };
    });
  }

  addItemToCartHandler(product) {
    const index = this.state.cartArray.findIndex(
      (item) =>
        item.id === product.id &&
        JSON.stringify(product.attributes) === JSON.stringify(item.attributes)
    );
    const helperArray = [...this.state.cartArray];
    if (index > -1) {
      helperArray[index].amount += 1;
      this.setState((prevState) => {
        return { ...prevState, cartArray: helperArray };
      });
    } else {
      this.setState((prevState) => {
        return { ...prevState, cartArray: [...prevState.cartArray, product] };
      });
    }
  }

  modifyCartAmountHandler(action, index) {
    const helperArray = [...this.state.cartArray];
    if (action === "add") {
      if (helperArray[index].amount < 50) {
        helperArray[index].amount += 1;
      }
    } else if (action === "subtract") {
      helperArray[index].amount -= 1;
    }
    const filterArray = helperArray.filter((item) => item.amount > 0);
    if (filterArray.length < 1) {
      this.setState((prevState) => {
        return { ...prevState, miniCartVisibility: false };
      });
    }
    this.setState((prevState) => {
      return { ...prevState, cartArray: filterArray };
    });
  }

  render() {
    return (
      <div>
        <Header
          categories={this.state.categories}
          currencyVisibilityHandler={this.currencyVisibilityHandler.bind(this)}
          currencyMenuVisibility={this.state.currencyMenuVisibility}
          currencySymbol={this.state.currencySymbol}
          miniCartVisibilityHandler={this.miniCartVisibilityHandler.bind(this)}
          cartArray={this.state.cartArray}
        />
        {this.state.currencyMenuVisibility && (
          <CurrencyMenu
            currencyVisibilityHandler={this.currencyVisibilityHandler.bind(
              this
            )}
            currencyIndexHandler={this.currencyIndexHandler.bind(this)}
            currencySymbolHandler={this.currencySymbolHandler.bind(this)}
          />
        )}
        <MiniCart
          cartArray={this.state.cartArray}
          currencyIndex={this.state.currencyIndex}
          currencySymbol={this.state.currencySymbol}
          miniCartVisibility={this.state.miniCartVisibility}
          miniCartVisibilityHandler={this.miniCartVisibilityHandler.bind(this)}
          modifyCartAmountHandler={this.modifyCartAmountHandler.bind(this)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>All</h1>
                {this.state.isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <ProductList
                    list={this.state.categories[0].products}
                    currencyIndex={this.state.currencyIndex}
                    detailedViewHandler={this.detailedViewHandler.bind(this)}
                    addItemToCartHandler={this.addItemToCartHandler.bind(this)}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/clothes"
            element={
              <div>
                <h1>Clothes</h1>
                {this.state.isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <ProductList
                    list={this.state.categories[1].products}
                    currencyIndex={this.state.currencyIndex}
                    detailedViewHandler={this.detailedViewHandler.bind(this)}
                    addItemToCartHandler={this.addItemToCartHandler.bind(this)}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/tech"
            element={
              <div>
                <h1>Tech</h1>
                {this.state.isLoading ? (
                  <h2>Loading...</h2>
                ) : (
                  <ProductList
                    list={this.state.categories[2].products}
                    currencyIndex={this.state.currencyIndex}
                    detailedViewHandler={this.detailedViewHandler.bind(this)}
                    addItemToCartHandler={this.addItemToCartHandler.bind(this)}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailedView
                product={this.state.detailedProduct}
                currencyIndex={this.state.currencyIndex}
                addItemToCartHandler={this.addItemToCartHandler.bind(this)}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartArray={this.state.cartArray}
                currencyIndex={this.state.currencyIndex}
                modifyCartAmountHandler={this.modifyCartAmountHandler.bind(
                  this
                )}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
