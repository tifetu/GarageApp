import React from "react";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="bg-gray-300 text-white py-8  mb-16">
      <div className="container bg-red-600 mx-auto px-4 py-8 max-w-5xl mx-auto rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">
              Schedule Your Appointment Today
            </h3>
            <p className="text-red-100">
              Your Automotive Repair & Maintenance Service Specialist
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-3xl font-bold">1800 456 7890</p>
            </div>
            <button className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center group">
              CONTACT US
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
