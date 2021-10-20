import React from "react";
import { connect } from "react-redux";
import ToggleCartHidden from "../../redux/cart/cart.actions";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import "./cart-icon.styles.scss";

const CartIcon = ({ ToggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={ToggleCartHidden}>
    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  ToggleCartHidden: () => dispatch(ToggleCartHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
