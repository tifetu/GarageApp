import React from "react";
import { DivideIcon as LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const DashboardCard = ({
  title,
  subtitle,
  buttonText,
  buttonColor = "red",
  icon: Icon,
  onClick,
  to,
}) => {
  const buttonColorClasses = {
    red: "text-red-600 hover:text-red-700",
    blue: "text-blue-600 hover:text-blue-700",
    gray: "text-gray-600 hover:text-gray-700",
  };
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to); // go to the route
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm  p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
            {subtitle}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="text-gray-400">
          <Icon size={48} strokeWidth={1} />
        </div>
      </div>

      <button
        onClick={handleClick}
        className={`${buttonColorClasses[buttonColor]} font-medium text-sm hover:underline transition-colors flex items-center gap-1 hover:cursor-pointer `}
      >
        {buttonText}
        <span>›</span>
      </button>
    </div>
  );
};

export default DashboardCard;
