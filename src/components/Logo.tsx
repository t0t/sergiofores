
import { motion } from "framer-motion";

const Logo = () => (
  <motion.svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.circle
      cx="25"
      cy="25"
      r="20"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M15 25h20M25 15v20"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </motion.svg>
);

export default Logo;
