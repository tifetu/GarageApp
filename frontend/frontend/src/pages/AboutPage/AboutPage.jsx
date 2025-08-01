import React from "react";
import About from "../../components/common/About/About";
import Experience from "../../components/common/Experience";
import CallToAction from "../../components/common/CallToSection";
import WhyChooseUs from "../../components/common/services/WhyChooseUs";
import LeaderSection from "../../components/common/services/LeaderSection";
function AboutPage() {
  return (
    <div>
      <About />
      <Experience />
      <WhyChooseUs />
      <LeaderSection />
      <CallToAction />
    </div>
  );
}

export default AboutPage;
