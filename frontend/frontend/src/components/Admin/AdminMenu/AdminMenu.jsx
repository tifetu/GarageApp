import { Home, FileText, UserPlus, Users, User, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function AdminMenu() {
  const location = useLocation();

  const adminMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "orders",
      label: "Orders",
      href: "/orders",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "new-order",
      label: "New order",
      href: "/orders/new",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: "add-employee",
      label: "Add employee",
      href: "/add-employee",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      id: "employees",
      label: "Employees",
      href: "/employees",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "add-customer",
      label: "Add customer",
      href: "/add-customer",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      id: "customers",
      label: "Customers",
      href: "/customers",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "services",
      label: "Services",
      href: "/services",
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-80 bg-gray-700 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-6 text-gray-300">ADMIN MENU</h2>
        <nav className="space-y-1">
          {adminMenuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === item.href
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default AdminMenu;
