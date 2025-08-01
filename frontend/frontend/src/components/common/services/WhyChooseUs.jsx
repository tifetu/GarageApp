import React from "react";
import { Award, Clock, DollarSign, Wrench } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="w-12 h-12" />,
      title: "Certified Expert Mechanics",
      description:
        "Our team consists of certified professionals with years of experience in automotive repair and maintenance.",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Fast And Quality Service",
      description:
        "We provide quick turnaround times without compromising on the quality of our work.",
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Best Prices in Town",
      description:
        "Competitive pricing with transparent estimates and no hidden fees for all our services.",
    },
    {
      icon: <Wrench className="w-12 h-12" />,
      title: "Awarded Workshop",
      description:
        "Recognized for excellence in automotive repair and customer satisfaction.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Why Choose Us */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Why Choose Us
              <div className="w-16 h-1 bg-red-600 mt-2"></div>
            </h2>
            <p className="text-gray-600 mb-8">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation heading towards.
            </p>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="text-red-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Additional Services */}
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              Additional Services
              <div className="w-16 h-1 bg-red-600 mt-2"></div>
            </h2>

            {/* Service Image */}
            <div className=" flex justify-center gap-4">
              <div className="mb-8">
                <img
                  src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Mechanic working"
                  className="w-full h-100 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Services List */}
              <div className="grid grid-cols-1 gap-3">
                {[
                  "General Auto Repair & Maintenance",
                  "Transmission Repair & Replacement",
                  "Tire Repair and Replacement",
                  "State Emissions Inspection",
                  "Break Job / Break Services",
                  "Electrical Diagnostics",
                  "Fuel System Repairs",
                  "Starting and Charging Repair",
                  "Steering and Suspension Work",
                  "Emission Repair Facility",
                  "Wheel Alignment",
                  "Computer Diagnostics Testing",
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
