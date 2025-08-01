import React from "react";
import vban1Image from "../../assets/images/vban1.jpg";
import vban2Image from "../../assets/images/vban2.jpg";
export const Experience = (props) => {
  return (
    <div>
      {/* Leader Banner */}
      <section className="container grid md:grid-cols-2 gap-8 items-center mx-auto">
        <div className="grid grid-cols-2">
          <img src={vban1Image} alt="mechanic" />
          <img src={vban2Image} alt="parts" />
        </div>
        <div>
          <h3 className="text-xl text-gray-500">Welcome to Our workshop</h3>
          <h2 className="text-3xl font-bold text-darkBlue mb-4">
            We have 24 years experience
          </h2>
          <p className="text-gray-600 mb-4">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation heading towards a streamlined cloud
            solution.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 font-medium rounded">
            ABOUT US →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Experience;
