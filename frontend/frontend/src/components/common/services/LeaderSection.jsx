import React from "react";
import { Play } from "lucide-react";

const LeaderSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden mb-16 ">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Car tire background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <span className="text-red-500 font-semibold tracking-wide mb-4 block">
            Working since 1992
            <div className="w-16 h-1 bg-red-600 mt-2"></div>
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            We are leader
            <br />
            in Car Mechanical Work
          </h2>

          <div className="flex items-center space-x-4">
            <button className="bg-red-600 hover:bg-red-700 transition-colors rounded-full p-4 group">
              <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <p className="font-semibold">WATCH INTRO VIDEO</p>
              <p className="text-gray-300 text-sm">ABOUT US</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderSection;
