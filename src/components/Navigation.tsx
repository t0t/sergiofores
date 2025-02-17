
import { motion, useScroll, useTransform } from "framer-motion";

const menuItems = ["Desarrollo Web", "Exploración", "Arte", "Laboratorio"];

const Navigation = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);
  const y = useTransform(scrollY, [0, 200], [-100, 0]);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-8 bg-background/80 backdrop-blur-sm"
      style={{ opacity, y }}
    >
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-center space-x-8">
          {menuItems.map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;
