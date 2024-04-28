import Anywhere from "@/components/layout/landingPage/anywhere/Anywhere";
import FAQ from "@/components/layout/landingPage/faq/FAQ";
import Features from "@/components/layout/landingPage/features/Features";
import Footer from "@/components/layout/landingPage/footer/Footer";
import Header from "@/components/layout/landingPage/header/Header";
import Mentions from "@/components/layout/landingPage/mentions/Mentions";
import NavBar from "@/components/layout/landingPage/navbar/NavBar";
import Border from "@/components/ui/Border";

const Home = () => {
  return (
    <>
      <NavBar />
      <Header />
      <Mentions />
      <Features />
      <Anywhere />
      <FAQ />
      <Border />
      <Footer />
    </>
  );
};

export default Home;
