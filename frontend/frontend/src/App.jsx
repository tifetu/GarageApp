import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddEmployee from "./pages/Admin/AddEmployee";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import EmployeeListPage from "./pages/Admin/EmployeeList";
import EditEmployee from "./components/Admin/EditEmployee/EditEmployee";
import CustomerPage from "./pages/CustomerPages/CustomerPage";
import CustomerListPage from "./pages/CustomerPages/CustomerListPage";

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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
