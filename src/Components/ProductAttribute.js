import { Component } from "react";
import classes from "./ProductAttribute.module.css";
import PropTypes from "prop-types";

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  selectedIndexHandler(index) {
    this.setState((prevState) => {
      return { ...prevState, selectedIndex: index };
    });
    this.props.attributesArrayHandler({
      ...this.props.attribute,
      selectedItem: index,
    });
  }

  componentDidMount() {
    this.props.attributesArrayHandler({
      ...this.props.attribute,
      selectedItem: this.state.selectedIndex,
    });
  }

  render() {
    const attributes = this.props.attribute.items?.map((item, index) => {
      return (
        <button
          className={
            this.props.attribute.type !== "swatch"
              ? index === this.state.selectedIndex
                ? classes.buttonSelected
                : classes.attributeButton
              : index === this.state.selectedIndex
              ? classes.swatchSelected
              : classes.swatchButton
          }
          style={{ backgroundColor: item.displayValue }}
          onClick={() => this.selectedIndexHandler(index)}
          key={index}
        >
          {this.props.attribute.type !== "swatch" && item.value}
        </button>
      );
    });

    return (
      <div>
        <p className={classes.attribute}> {this.props.attribute.name}:</p>
        <div className={classes.attributelist}>{attributes}</div>
      </div>
    );
  }
}

ProductAttribute.propTypes = {
  attributesArrayHandler: PropTypes.func,
  attribute: PropTypes.array,
};

export default ProductAttribute;
