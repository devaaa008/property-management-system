import { LoginPage } from "./pages/LoginPage";
import { AdminHomePage } from "./pages/AdminHomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { ListCustomersPage } from "./pages/ListCustomersPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./contexts/AuthContext";
import { ViewPropertiesPage } from "./pages/ViewPropertiesPage";
import { ViewBookingsPage } from "./pages/ViewBookingsPage";
import { AddRentPage } from "./pages/AddRentPage";
import { AddBuyPage } from "./pages/AddBuyPage";
import { CustomerHomePage } from "./pages/CustomerHomePage";
import { PropertyListingsPage } from "./pages/PropertyListingsPage";
import { ViewPropertyDetail } from "./pages/ViewPropertyDetail";

function App() {
  const { adminLoggedIn, loggedIn } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={adminLoggedIn ? <AdminRoutes /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/customer/*"
            element={loggedIn ? <CustomerRoutes /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<AdminHomePage />} />
        <Route path="/viewCustomers" element={<ListCustomersPage />} />
        <Route path="/viewProperties" element={<ViewPropertiesPage />} />
        <Route path="/viewbookings" element={<ViewBookingsPage />} />
        <Route path="/addRent" element={<AddRentPage />} />
        <Route path="/addBuy" element={<AddBuyPage />} />
        {/* Add more protected routes as needed */}
      </Routes>
    </>
  );
};

const CustomerRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<CustomerHomePage />} />
        <Route
          path="/rentPropertyListings"
          element={<PropertyListingsPage mode="rent" />}
        />
        <Route
          path="/buyPropertyListings"
          element={<PropertyListingsPage mode="buy" />}
        />
        {/* Add more protected routes as needed */}
        <Route
          path="/property/view/:propertyId"
          element={<ViewPropertyDetail />}
        />
      </Routes>
    </>
  );
};
export default App;
