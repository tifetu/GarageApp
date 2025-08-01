import React from "react";
import backgroundImage from "../../../assets/images/contactBackgroundimag.png.jpg";
const Contact = () => {
  return (
    <div className="mx-auto px-4 py-8 font-sans text-gray-800">
      {/* Main Title */}
      <div
        className="text-center mb-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          padding: "40px",
          borderRadius: "8px",
        }}
      >
        {/* Main Title */}
        <h1 className="text-3xl text-white font-bold mb-2">Contact Us</h1>

        {/* About Us Link */}
        <div className="mb-8">
          <p className="text-lg">- About Us</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
        <section className="mb-8 w-full md:w-1/2 text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509949!2d144.9537353153165!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11f5b5%3A0x5045675218ceed30!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1616161616161!5m2!1sen!2sau"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </section>

        <section className="mb-8 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Our Address</h2>
          <p className="mb-4">
            Completely synergize resource taxing relationships via premier niche
            markets. Professionally cultivate one-to-one customer service.
          </p>

          <div className="space-y-1 mb-4">
            <p className="text-lg mb-4">
              <strong>Address:</strong> Ethiopia, Addis Ababa, 6-killo, behind
              AAU
            </p>
            <p className="text-lg mb-4">
              <strong>Email:</strong> Abegarage@gmail.com
            </p>
            <p className="text-lg mb-4">
              <strong>Phone:</strong> +251936599054 / 1254 897 3654
            </p>
          </div>
        </section>
      </div>

      {/* Schedule Section */}
      <div className="bg-gray-100 p-6 rounded-lg text-center w-full ">
        <section className="flex justify-center items-center gap-4 mb-4 bg-red-600 p-6 rounded-lg text-white max-w-5xl mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">
              Schedule Your Appointment Today
            </h2>
            <p className="mb-4">
              Your Automotive Repair & Maintenance Service Specialist
            </p>
          </div>

          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-2xl font-bold">1800.456.7890</p>
            <button className="bg-white text-black px-6 py-4 rounded font-medium">
              CONTACT US →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
