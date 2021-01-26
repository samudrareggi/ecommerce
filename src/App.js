import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProductDetail, ProductListing, Bag } from "./pages";
import { Navbar } from "./components";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <ProductListing />
        </Route>
        <Route path="/checkout">
          <Bag />
        </Route>
        <Route path={`/:id`}>
          <ProductDetail />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
