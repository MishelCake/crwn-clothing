import "./App.css";
import Homepage from "../src/pages/homepage/homepage.component";
import { Route, Switch } from "react-router";
import ShopPage from "./pages/shop/shop.component.jsx";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
