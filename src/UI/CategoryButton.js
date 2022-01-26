import { Component } from "react";
import classes from "./CategoryButton.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class CategoryButton extends Component {
  navClickHandler() {
    this.props.currentCategoryHandler(this.props.category);
  }

  render() {
    let navigateHelper = `/${this.props.category}`;
    if (navigateHelper === "/all") {
      navigateHelper = "/";
    }

    return (
      <NavLink
        className={({ isActive }) =>
          isActive
            ? `${classes.categoryButton} ${classes.activeCategory}`
            : classes.categoryButton
        }
        to={navigateHelper}
        onClick={this.navClickHandler.bind(this)}
      >
        {this.props.category}
      </NavLink>
    );
  }
}

CategoryButton.propTypes = {
  currentCategoryHandler: PropTypes.func,
  category: PropTypes.object,
};

export default CategoryButton;
