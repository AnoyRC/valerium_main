"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function CardHolder({ children }) {
  const holder = useRef();

  useGSAP(() => {
    const tilt = holder.current;

    const height = tilt.clientHeight;
    const width = tilt.clientWidth;

    tilt.addEventListener("mousemove", (e) => {
      const xVal = e.layerX;

      const yVal = e.layerY;

      const yRotation = 0.5 * ((xVal - width / 2) / width);

      const xRotation = -0.5 * ((yVal - height / 2) / height);

      gsap.to(tilt, {
        duration: 0.5,
        rotationX: xRotation,
        rotationY: yRotation,
        transformPerspective: 100,
        ease: "easeOut",
      });
    });

    tilt.addEventListener("mouseleave", () => {
      gsap.to(tilt, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
      });
    });

    return () => {
      tilt.removeEventListener("mousemove", () => {});
      tilt.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div className="h-full w-full tilt " ref={holder}>
      {children}
    </div>
  );
}
