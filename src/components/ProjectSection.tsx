
import { ExternalLink } from "lucide-react";

interface ProjectSectionProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const getButtonConfig = (id: string) => {
  switch (id) {
    case 'web':
      return {
        text: "Ver proyectos web",
        url: "https://t0t.github.io/sergiofores-main/"
      };
    case 'exploracion':
      return {
        text: "Explorar más",
        url: "https://o1234.lovable.app/"
      };
    case 'arte':
      return {
        text: "Ver galería",
        url: "https://t0t.github.io/sergiofores_art/"
      };
    case 'laboratorio':
      return {
        text: "Ver experimentos",
        url: "https://t0t.github.io/huerto_01234/"
      };
    default:
      return {
        text: "Ver más",
        url: "https://sergiofores.com"
      };
  }
};

const ProjectSection = ({ id, title, description, imageUrl }: ProjectSectionProps) => {
  const buttonConfig = getButtonConfig(id);

  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={buttonConfig.url}>
        <button>{buttonConfig.text}</button>
      </a>
      <img src={imageUrl} alt={title} />
    </section>
  );
};

export default ProjectSection;
