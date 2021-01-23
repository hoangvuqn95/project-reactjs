import Footer from "components/Footer";
import Header from "components/Header";
import HomePage from "features/HomePage";
import PostFeature from "features/Post";
import ProductFeatures from "features/Product";
import { Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route path="/products" component={ProductFeatures} />

        <Route path="/posts" component={PostFeature} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;

// FETCH API VOI getById bi loi voi Routing, neu 1 Route co exact thi` duong dan url getById se khong get duoc, vi` vay phai tao 1 trang chu don gian dung` Route exact.
