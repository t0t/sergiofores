
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProjectSection from "@/components/ProjectSection";

const projects = [
  {
    id: "web",
    title: "Desarrollo Web",
    description: "Mi faceta como desarrollador web y programador creativo.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
  },
  {
    id: "exploracion",
    title: "Exploración",
    description: "Un espacio para la exploración y el descubrimiento personal.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
  },
  {
    id: "arte",
    title: "Arte",
    description: "Mi trabajo como artista plástico y visual.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
  },
  {
    id: "laboratorio",
    title: "Laboratorio",
    description: "Espacio de experimentación y desarrollo de ideas en Github.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80",
  },
];

const Index = () => {
  useEffect(() => {
    document.title = "Sergio Fores - Portfolio Experimental";
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Portfolio experimental de Sergio Fores - Desarrollador web, artista y explorador digital";
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <main style={{ position: 'relative', minHeight: '400vh' }}>
      <div style={{ height: '100vh', backgroundColor: 'rgba(217, 70, 239, 0.2)' }}>
        <Hero />
        <Navigation />
        <WhatsAppButton />
      </div>
      <div style={{ marginTop: '1rem' }}>
        {projects.map((project) => (
          <ProjectSection
            key={project.id}
            {...project}
          />
        ))}
      </div>
    </main>
  );
};

export default Index;
