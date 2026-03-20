import Hero from "./components/Hero";
import Difference from "./components/Difference";
import FourScreens from "./components/FourScreens";
import HowItWorks from "./components/HowItWorks";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "#050f08",
      }}
    >
      <Hero />
      <Difference />
      <FourScreens />
      <HowItWorks />
      <Waitlist />
      <Footer />
    </main>
  );
}
