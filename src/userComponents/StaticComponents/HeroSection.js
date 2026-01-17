{
  // import React from "react";
  // // import heroImage from "../assets/hero-fitness.jpg"; // Add your hero image here
  // const HeroSection = () => {
  //   return (
  //     <section
  //       className="hero-section d-flex align-items-center"
  //       style={{
  //         background: `url('') no-repeat center center`,
  //         backgroundSize: "cover",
  //         height: "90vh",
  //         color: "#fff",
  //         position: "relative",
  //       }}
  //     >
  //       <div
  //         className="overlay"
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           left: 0,
  //           right: 0,
  //           bottom: 0,
  //           backgroundColor: "rgba(0,0,0,0.6)",
  //         }}
  //       ></div>
  //       <div className="container text-center position-relative">
  //         <h1 className="display-4 fw-bold mb-3">Transform Your Body & Mind</h1>
  //         <p className="lead mb-4">
  //           Join our community of fitness enthusiasts and achieve your goals with
  //           expert trainers.
  //         </p>
  //         <div className="d-flex justify-content-center gap-3">
  //           <a href="#packages" className="btn btn-primary btn-lg">
  //             Get Started
  //           </a>
  //           <a href="#packages" className="btn btn-outline-light btn-lg">
  //             Explore packages
  //           </a>
  //         </div>
  //       </div>
  //       {/* Optional floating statistics */}
  //       {/* <div
  //         className="stats position-absolute w-100 d-flex justify-content-around text-center"
  //         style={{ bottom: "30px", left: 0 }}
  //       >
  //         <div>
  //           <h3 className="fw-bold">500+</h3>
  //           <p>Members</p>
  //         </div>
  //         <div>
  //           <h3 className="fw-bold">20+</h3>
  //           <p>Trainers</p>
  //         </div>
  //         <div>
  //           <h3 className="fw-bold">50+</h3>
  //           <p>Packages</p>
  //         </div>
  //       </div> */}
  //     </section>
  //   );
  // };
  // export default HeroSection;
  // import React from "react";
  // // import heroVideo from "../../assets/StaticImages/hero-video.mp4"; // Place your video in src/assets
  // const HeroSection = () => {
  //   return (
  //     <section
  //       className="hero-section d-flex align-items-center justify-content-center"
  //       style={{
  //         height: "90vh",
  //         color: "#fff",
  //         position: "relative",
  //         overflow: "hidden",
  //       }}
  //     >
  //       {/* Background Video */}
  //       <video
  //         autoPlay
  //         loop
  //         muted
  //         playsInline
  //         className="position-absolute w-100 h-100"
  //         style={{
  //           objectFit: "cover",
  //           top: 0,
  //           left: 0,
  //           zIndex: -2,
  //         }}
  //       >
  //         <source src="/StaticImages/heroVideo.mp4" type="video/mp4" />
  //         Your browser does not support the video tag.
  //       </video>
  //       {/* Dark Overlay */}
  //       <div
  //         style={{
  //           position: "absolute",
  //           top: 0,
  //           left: 0,
  //           width: "100%",
  //           height: "100%",
  //           backgroundColor: "rgba(0,0,0,0.6)",
  //           zIndex: -1,
  //         }}
  //       ></div>
  //       {/* Text and Buttons */}
  //       <div className="container text-center position-relative">
  //         <h1 className="display-4 fw-bold mb-3">Transform Your Body & Mind</h1>
  //         <p className="lead mb-4">
  //           Join our community of fitness enthusiasts and achieve your goals with
  //           expert trainers.
  //         </p>
  //         <div className="d-flex justify-content-center gap-3">
  //           <a href="#packages" className="btn btn-primary btn-lg">
  //             Get Started
  //           </a>
  //           <a href="#packages" className="btn btn-outline-light btn-lg">
  //             Explore packages
  //           </a>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // };
  // export default HeroSection;
}

import React from "react";

const HeroSection = () => {
  return (
    <section
      className="hero-section d-flex align-items-center justify-content-center"
      style={{
        height: "95vh",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/StaticImages/heroImage.avif" // fallback image
        className="position-absolute w-100 h-100"
        style={{
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      >
        <source src="/StaticImages/heroVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          top: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: -1,
        }}
      ></div>

      {/* Text Content */}
      <div className="container text-center position-relative">
        <h1 className="display-4 fw-bold mb-3">Transform Your Body & Mind</h1>
        <p className="lead mb-4">
          Join our community of fitness enthusiasts and achieve your goals with
          expert trainers.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <a href="#packages" className="btn btn-primary btn-lg">
            Get Started
          </a>
          <a href="#packages" className="btn btn-outline-light btn-lg">
            Explore packages
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
