import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartPage from "./pages/Cart";
import CartProvider from "./Providers/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AuthProvider from "./Providers/AuthProvider";
import ProfilePage from "./pages/ProfilePage";
function App() {
  return (
    <Router >
      <AuthProvider>
        <CartProvider>
          <ToastContainer style={{ fontSize: "1rem" }} />
          <Switch>
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/" component={Home} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
