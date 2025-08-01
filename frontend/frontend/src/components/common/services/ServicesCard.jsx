import React from "react";
import { Settings, Cog, Wrench, Car, Palette, ArrowRight } from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Performance Upgrade",
      category: "SERVICE AND REPAIRS",
      description:
        "Enhance your vehicle's performance with our expert upgrade services.",
    },
    {
      icon: <Cog className="w-12 h-12" />,
      title: "Transmission Services",
      category: "SERVICE AND REPAIRS",
      description: "Complete transmission repair and maintenance services.",
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "Break Repair & Service",
      category: "SERVICE AND REPAIRS",
      description:
        "Professional brake system inspection, repair, and maintenance.",
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Engine Service & Repair",
      category: "SERVICE AND REPAIRS",
      description: "Comprehensive engine diagnostics, repair, and maintenance.",
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "Tyre & Wheels",
      category: "SERVICE AND REPAIRS",
      description:
        "Complete tire services including replacement and alignment.",
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Denting & Painting",
      category: "SERVICE AND REPAIRS",
      description:
        "Professional body work and paint services for your vehicle.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
            <div className="w-16 h-1 bg-red-600 mx-auto mt-2"></div>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the journey heading towards a
            streamlined cloud solution.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 group"
            >
              <div className="text-gray-400 group-hover:text-red-600 transition-colors duration-300 mb-6">
                {service.icon}
              </div>

              <div className="mb-4">
                <span className="text-sm text-red-600 font-semibold tracking-wide">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>

              <button className="flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors group">
                READ MORE
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
