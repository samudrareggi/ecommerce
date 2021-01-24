import React from "react";
import { Switch, Route } from "react-router-dom";
import { ProductDetail, ProductListing, Bag } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
