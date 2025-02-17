
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Palette, Sparkles } from "lucide-react";
import Logo from "./Logo";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-col items-center p-6 bg-white/80 rounded-lg shadow-lg backdrop-blur-sm">
    <div className="w-8 h-8 mb-3 text-accent">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const features = [
  {
    icon: <Code2 />,
    title: "Desarrollo Web",
    description: "Soluciones digitales creativas y funcionales"
  },
  {
    icon: <Palette />,
    title: "Diseño UI/UX",
    description: "Experiencias visuales memorables"
  },
  {
    icon: <Sparkles />,
    title: "Innovación",
    description: "Explorando nuevas posibilidades"
  }
];

const Hero = () => {
  const { scrollY } = useScroll();
  
  const scrollTransforms = {
    containerY: useTransform(scrollY, [0, 200], ['50vh', '16px']),
    containerX: useTransform(scrollY, [0, 200], ['50%', '16px']),
    containerTransform: useTransform(scrollY, [0, 200], ['translate(-50%, -50%)', 'translate(0, 0)']),
    contentScale: useTransform(scrollY, [0, 200], [1, 0.6]),
    titleSize: useTransform(scrollY, [0, 200], [1, 0.7]),
    subtitleOpacity: useTransform(scrollY, [0, 100], [1, 0]),
    featuresOpacity: useTransform(scrollY, [0, 100], [1, 0])
  };
  
  return (
    <motion.div
      className="fixed z-50"
      style={{
        top: scrollTransforms.containerY,
        left: scrollTransforms.containerX,
        transform: scrollTransforms.containerTransform,
      }}
    >
      <motion.div 
        className="flex flex-col items-start text-left relative"
        style={{ scale: scrollTransforms.contentScale }}
      >
        <div className="flex items-center gap-4">
          <Logo />
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80"
            style={{ scale: scrollTransforms.titleSize }}
          >
            Sergio Fores
          </motion.h1>
        </div>
        
        <motion.div className="w-full text-center mt-4">
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl inline-block"
            style={{ opacity: scrollTransforms.subtitleOpacity }}
          >
            "Transformando ideas en experiencias digitales únicas"
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl px-4"
            style={{ opacity: scrollTransforms.featuresOpacity }}
          >
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
