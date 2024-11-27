import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainView from "./views/MainView";
import ProductReviews from "./views/ProductReviews";
import ProductView from "./views/ProductView";
import SearchHistory from "./views/SearchHistory";
import TrendsView from "./views/TrendsView";
import { Auth0Provider } from '@auth0/auth0-react';
import { AppProvider } from "./AppContext";
import NavBar from "./components/NavBar";

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
        <AppProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/reviews" element={<ProductReviews />} />
            <Route path="/product" element={<ProductView />} />
            <Route path="/history" element={<SearchHistory />} />
            <Route path="/trends" element={<TrendsView />} />
          </Routes>
          <footer className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          © 2024 Mercado Visión. Todos los derechos reservados.
        </div>
      </footer>
        </AppProvider>
      </Router>
    </Auth0Provider>
  );
}

export default App;
