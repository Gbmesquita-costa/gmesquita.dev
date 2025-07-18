import { Mail, Twitter, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "email",
      icon: Mail,
      href: "mailto:gbmesquitadev@gmail.com",
      label: "Email",
    },
    {
      name: "twitter",
      icon: Twitter,
      href: "https://twitter.com/Gabriel84285663",
      label: "Twitter",
    },
    {
      name: "github",
      icon: Github,
      href: "https://github.com/Gbmesquita-costa",
      label: "GitHub",
    },
    {
      name: "linkedin",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gabriel-mesquita-635600223/",
      label: "LinkedIn",
    },
    {
      name: "instagram",
      icon: Instagram,
      href: "https://instagram.com/gb.mesquita",
      label: "Instagram",
    },
  ];

  return (
    <div className="flex items-center space-x-6">
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground 
          hover:text-green-400 transition-colors duration-200"
          aria-label={link.label}
        >
          <link.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
};

export { SocialLinks };
