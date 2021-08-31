import "./App.css";
import Homepage from "../src/pages/homepage/homepage.component";
import { Route, Switch } from "react-router";
import ShopPage from "./pages/shop/shop.component.jsx";
import Header from "./components/header/header.component";

function App() {
  return (
    <div>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
