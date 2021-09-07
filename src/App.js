import "./App.css";
import Homepage from "../src/pages/homepage/homepage.component";
import { Route, Switch } from "react-router";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  //handling our app for every auth change on firebase

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //if userAuth exists:
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //update the app state with the id and other data of signed in user
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      //if userAuth does not exist set currentUser to null
      else {
        this.setState({ currentUser: userAuth });
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
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
