import React from "react";
import { BiDumbbell, BiTargetLock, BiGroup } from "react-icons/bi";

const AboutUs = () => {
  return (
    <div className="container-fluid   my-5 py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">About Us</h2>
        <p className="text-muted">
          We are committed to helping you achieve your fitness goals with
          passion and dedication.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <BiTargetLock size={50} className="mb-3 text-primary" />
          <h4 className="fw-bold">Our Mission</h4>
          <p>
            To provide a motivating environment where everyone can reach their
            fitness goals.
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <BiDumbbell size={50} className="mb-3 text-success" />
          <h4 className="fw-bold">Our Vision</h4>
          <p>
            To become the leading fitness community where health and wellness
            are accessible to all.
          </p>
        </div>

        <div className="col-md-4 mb-4">
          <BiGroup size={50} className="mb-3 text-warning" />
          <h4 className="fw-bold">Our Values</h4>
          <p>
            Dedication, professionalism, and a supportive community for every
            member.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
