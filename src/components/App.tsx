import { Box } from "@mui/material";
import Presentation from "@/components/Presentation";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import College from "@/components/College";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function App() {
  return (
    <Box>
      <Presentation />
      <NavBar />
      <Experience />
      <Hero />
      <College />
      <Projects />
      <Skills />
      <Contact />
    </Box>
  );
}
