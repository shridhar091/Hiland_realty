import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import AboutUs from "./AboutUs";
import Projects from "./Projects";
import Reviews from "./Reviews";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  
  return (
    <Box sx={{ position: "relative" }}>
      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="reviews">
        <Reviews />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </Box>
  );
};

export default Index;
