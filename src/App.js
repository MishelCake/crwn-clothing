import "./App.css";
import HomePage from "../src/pages/homepage/homepage.component";
import { Route, Switch, Redirect } from "react-router";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { connect } from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import { Component } from "react";

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
        setCurrentUser( userAuth );
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
