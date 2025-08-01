import React from "react";
import tyre from "../../../assets/images/tyre_.jpg";
import bannerImage from "../../../assets/images/banner2.jpg";
import { Link } from "react-router-dom";
function About() {
  return (
    <>
      <section className="relative py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white overflow-hidden  ">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Car tire background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              About Us
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex flex-col grid-cols-1 ">
                <Link to="/" className="text-red-500 font-semibold flex-1">
                  Home{" "}
                </Link>
              </div>
              <div className="flex flex-col grid-cols-1">
                <Link to="/about" className="text-gray-300 text-sm">
                  ABOUT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First Content Section */}
      <section className=" px-4 md:px-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold text-darkBlue mb-4">
            We are highly skilled mechanics for your car repair
          </h2>
          <p className="text-gray-600 mb-6">
            Bring to the table win-win survival strategies to ensure proactive
            domination. Override the digital divide with additional
            clickthroughs from DevOps. User generated content in real-time will
            have multiple touchpoints for offshoring.
          </p>
        </div>
        <img src={tyre} alt="tire" className="w-full h-2/3" />
      </section>
    </>
  );
}
export default About;
