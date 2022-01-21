import { Component } from "react";
import classes from "./CategoryButton.module.css";
import { NavLink } from "react-router-dom";

class CategoryButton extends Component {
  navLinkClickHandler() {
    let navigateHelper = `/${this.props.category}`;
    if (navigateHelper === "/all") {
      navigateHelper = "/";
    }
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
        onClick={this.navLinkClickHandler.bind(this)}
        to={navigateHelper}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        {this.props.category}
      </NavLink>
    );
  }
}

export default CategoryButton;
