import "skeleton-css/css/normalize.css";
import "skeleton-css/css/skeleton.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories" component={Categories} />
          <Route path="/upload" component={Upload} />
          <Route path="/dashboard" component={Dashboard} />

        </Switch>
      </Router>
    </>
  );
}
export default App;
