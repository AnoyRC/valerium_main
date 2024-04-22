import Image from "next/image";
import FooterBottom from "./FooterBottom";
import FooterLists from "./FooterLists";
import Social from "./Social";

import { footerListsData } from "@/utils/data/footerListData";

const Footer = () => {
  return (
    <footer className="mx-auto max-w-7xl">
      <section className="flex translate-y-1/2 items-start justify-between px-16">
        <Image
          src="/valerium-logo.svg"
          alt="Valerium"
          width={200}
          height={200}
        />

        <section className="flex space-x-12">
          {footerListsData.map((list, index) => (
            <FooterLists
              key={index}
              heading={list.heading}
              lists={list.lists}
            />
          ))}

          <Social />
        </section>
      </section>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
