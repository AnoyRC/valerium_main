"use client";

import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { accordionData } from "@/utils/data/accordionData";

const FAQ = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="my-16 space-y-16">
      <h2 className="text-center text-6xl font-bold text-black">FAQ</h2>

      <div className="mx-auto w-10/12 max-w-5xl">
        {accordionData.map((item, index) => (
          <Accordion key={index} open={open === index + 1}>
            <AccordionHeader onClick={() => handleOpen(index + 1)}>
              {item.header}
            </AccordionHeader>

            <AccordionBody>{item.body}</AccordionBody>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
