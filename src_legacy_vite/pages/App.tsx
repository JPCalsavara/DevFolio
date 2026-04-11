import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export const App = () => {
  return (
    <>
      <NavBar />
      <div className="w-auto h-auto flex flex-col items-center bg-indigo-800">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </div>
    </>
  );
};
