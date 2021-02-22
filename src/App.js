import "./App.css";
import Search from "./Search/Search";

import { Route, Switch } from "react-router-dom";
import Book from "./Search/Book/Book";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Search} />

        <Route path="/book" component={Book} />
      </Switch>
    </div>
  );
}

export default App;
