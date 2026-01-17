

import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./StaticComponents/HeroSection";
import AboutUs from "./StaticComponents/AboutUs";
import FetchTrainers from "./trainers/FetchTrainers";
import FetchPackages from "./packages/FetchPackages";
import ContactUs from "./StaticComponents/ContactUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id="hero">
        <HeroSection />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="trainers">
        <FetchTrainers />
      </section>
      <section id="packages">
        <FetchPackages />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
      <footer className="bg-dark text-white text-center p-3">
        © 2025 T3 Fitness. All Rights Reserved.
      </footer>
    </>
  );
}
