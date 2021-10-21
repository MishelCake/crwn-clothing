import "./App.css";
import { connect } from "react-redux";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import { Component } from "react";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { Route, Switch, Redirect } from "react-router";
import { setCurrentUser } from "./redux/user/user.actions";

import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import HomePage from "../src/pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends Component {
  //handling our app for every auth change on firebase

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //if userAuth exists:
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //update the app state with the id and other data of signed in user
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      //if userAuth does not exist set currentUser to null
      else {
        setCurrentUser(userAuth);
      }
    });
  }

  //close the subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
