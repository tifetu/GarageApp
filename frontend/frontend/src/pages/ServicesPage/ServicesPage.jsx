import React from "react";
import ServicesGrid from "../../components/common/services/ServicesCard";
import WhyChooseUs from "../../components/common/services/WhyChooseUs";
import CallToAction from "../../components/common/CallToSection";
import LeaderSection from "../../components/common/services/LeaderSection";
function ServicesPage() {
  return (
    <div>
      <ServicesGrid />
      <WhyChooseUs />
      <LeaderSection />
      <CallToAction />
    </div>
  );
}

export default ServicesPage;
