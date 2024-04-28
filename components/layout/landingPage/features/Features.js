"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Header from "./Header";
import CardHolder from "./cards/CardHolder";
import Card1 from "./cards/Card1";
import Card2 from "./cards/Card2";
import Card3 from "./cards/Card3";

export default function Features() {
  const container = useRef();
  const header = useRef();
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards = gsap.utils.toArray(".card");

    ScrollTrigger.create({
      trigger: header.current,
      start: "top top+=100",
      end: `+=${container.current.clientHeight - cards[0].clientHeight - 120}`,
      pin: true,
      pinSpacing: false,
      id: "pin",
      invalidateOnRefresh: true,
    });

    cards.forEach((card, index) => {
      const tween = gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: () => `top bottom-=100`,
          end:
            index === cards.length - 1
              ? "bottom bottom"
              : `+=${card.clientHeight * (cards.length - index - 1)}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
        ease: "none",
        scale: () => 1 - (cards.length - index) * 0.025,
      });

      ScrollTrigger.create({
        trigger: card,
        start: `top+=${(cards.length - index) * 50} top+=${card.clientHeight}`,
        pin: true,
        pinSpacing: false,
        end:
          index === cards.length - 1
            ? "bottom bottom"
            : `+=${card.clientHeight * (cards.length - index - 1) - 9}`,
        id: "pin",
        invalidateOnRefresh: true,
      });
    });
  }, [container]);

  return (
    <div>
      <div className="relative mt-10 mb-36">
        <div ref={header}>
          <Header />
        </div>

        <div className="relative flex flex-col items-center" ref={container}>
          <div
            className="h-[50vh] w-3/4 mb-[50px] card"
            style={{
              top: 40,
            }}
          >
            <CardHolder>
              <Card1 />
            </CardHolder>
          </div>
          <div
            className="h-[50vh] w-3/4 mb-[50px] card"
            style={{
              top: 85,
            }}
          >
            <CardHolder>
              <Card2 />
            </CardHolder>
          </div>
          <div
            className="h-[50vh] w-3/4 mb-[50px] card"
            style={{
              top: 130,
            }}
          >
            <CardHolder>
              <Card3 />
            </CardHolder>
          </div>
        </div>
      </div>
    </div>
  );
}
