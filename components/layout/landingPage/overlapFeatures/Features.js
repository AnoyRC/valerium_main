"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Features = () => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    let tl = gsap.timeline();

    tl.from(".card1", {
      yPercent: 100,
      opacity: 0,
    });
    tl.from(".card2", {
      yPercent: 200,
      opacity: 0,
    });
    tl.from(".card3", {
      yPercent: 200,
      opacity: 0,
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="block_top">
            <h1>Block Header</h1>
          </div>
        </div>
      </div>
      <div className="row cards-row">
        <div className="col-12">
          <div className="cards">
            <div
              className="custom-card card1"
              style={{ backgroundColor: "darkcyan", zIndex: 2 }}
            >
              <h1>Slide 1</h1>
            </div>
            <div
              className="custom-card card2"
              style={{ backgroundColor: "aliceblue", zIndex: 3 }}
            >
              <h1>Slide 2</h1>
            </div>
            <div
              className="custom-card card3"
              style={{ backgroundColor: "green", zIndex: 4 }}
            >
              <h1>Slide 3</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="next_block">
            <h1>End content</h1>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default Features;
