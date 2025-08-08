import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";

interface SocialBadgeProps {
  icon: keyof typeof FaIcons; // like "FaGithub"
  label: string;
  link: string;
  color?: string; // brand color (light mode)
  darkColor?: string; // brand color for dark mode
}

export default function SocialBadge({
  icon,
  label,
  link,
  color = "#333",
  darkColor,
}: SocialBadgeProps) {
  const IconComponent = FaIcons[icon];

  if (!IconComponent) {
    console.warn(`Icon ${icon} not found in react-icons/fa`);
    return null;
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-dashed transition-all`}
      style={{
        color: color,
        borderColor: color,
        
        ...(darkColor && {
          "--tw-text-opacity": 1,
          "--tw-border-opacity": 1,
          color: "white",
          borderColor: darkColor,
        }),
      }}
    >
      <IconComponent size={16} />
      {label}
    </motion.a>
  );
}

