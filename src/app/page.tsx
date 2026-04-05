import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsHeader from "@/components/ProjectsHeader";
import Projects from "@/components/Projects";
import SkillsHeader from "@/components/SkillsHeader";
import SkillCards from "@/components/SkillCards";
export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <section id="work" className="bg-[#000]">
        <ProjectsHeader />
        <Projects />
        
      </section>
      <SkillsHeader/>
      <SkillCards />
      <div className="h-screen bg-[var(--color-background)]" />
    </main>
  );
}