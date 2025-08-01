import React from "react";
import Home from "../components/common/Home/Home";
import WhyChooseUs from "../components/common/services/WhyChooseUs";
import LeaderSection from "../components/common/services/LeaderSection";
import ServicesGrid from "../components/common/services/ServicesCard";
import Experience from "../components/common/Experience";
import CallToAction from "../components/common/CallToSection";
function HomePage() {
  return (
    <div>
      <Home />

      <Experience />
      <ServicesGrid />
      <WhyChooseUs />
      <LeaderSection />
      <CallToAction />
    </div>
  );
}

export default HomePage;
