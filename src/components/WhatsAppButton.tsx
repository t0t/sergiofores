
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    const prefix = "34";
    const parts = ["619", "549", "032"];
    const number = `${prefix}${parts.join("")}`;
    window.open(`https://wa.me/${number}`, "_blank");
  };

  return (
    <motion.button
      className="fixed bottom-4 right-4 z-50 p-4 rounded-full hover:text-white/80 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  );
};

export default WhatsAppButton;
