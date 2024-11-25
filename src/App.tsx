import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainView from "./views/MainView";
import SellerReviews from "./views/SellerReviews";
import ProductView from "./views/ProductView";
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
      domain="dev-4r8anlrj2e3av060.us.auth0.com"
      clientId="Hcr44YogF3fpzxBDeDAb326vubYbMDGC"
      authorizationParams={
        {
          redirect_uri: window.location.origin
        }
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/reviews" element={<SellerReviews />} />
          <Route path="/product" element={<ProductView />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;