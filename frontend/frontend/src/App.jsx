import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddEmployee from "./pages/Admin/AddEmployee";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/HomePage";
import EmployeeListPage from "./pages/Admin/EmployeeList";
import EditEmployee from "./components/Admin/EditEmployee/EditEmployee";
import CustomerPage from "./pages/CustomerPages/CustomerPage";
import CustomerListPage from "./pages/CustomerPages/CustomerListPage";

import EditCustomerPage from "./pages/CustomerPages/EditCustomerPage";
import CustomerProfile from "./components/Customer/CustomerProfile/CustomerProfile";
// import AddNewOrder from "./components/Orders/AddNewOrder/AddNewOrder";
// import AddVehicleForm from "./components/Vehicle/AddVehicle/AddVehicleForm";
import Contact from "./components/common/Contacts/Contact";
import ServicesPage from "./pages/ServicesPage/ServicesPage";

import AboutPage from "./pages/AboutPage/AboutPage";

import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AddVehicle from "./components/Vehicle/AddVehicle";
import Orders1Page from "./pages/Orders/Orders1Page";
import { CreateOrder } from "./pages/Orders/CreateOrder";
import OrderDetail from "./components/Orders/OrderDetail/OrderDetail";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/employees" element={<EmployeeListPage />} />
        <Route path="/employee/:id" element={<EditEmployee />} />
        <Route path="/add-customer" element={<CustomerPage />} />
        <Route path="/customers" element={<CustomerListPage />} />
        <Route
          path="/customer/edit/:customerId"
          element={<EditCustomerPage />}
        />
        <Route path="/customer/:customerId" element={<CustomerProfile />} />
        <Route path="/orders/new" element={<Orders1Page />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        {/* <Route path="/vehicle/add/:customerId" element={<AddVehicleForm />} /> */}
        {/* <Route path="/vehicle/add" element={<AddVehicleForm />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/orders" element={<CreateOrder />} />
        <Route path="/order/new/:customerId" element={<OrderDetail />} />

        {/* <Route path="/order/:orderId/edit" element={<EditOrder />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
