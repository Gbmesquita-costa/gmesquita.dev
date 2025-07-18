import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Home,
  User,
  FileText,
  Monitor,
  Clock,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Link,
  Eye,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandPalette = ({ open, onOpenChange }: CommandPaletteProps) => {
  const navigate = useRouter();

  const generalCommands = [
    {
      label: "Copiar Link",
      icon: Link,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        onOpenChange(false);
      },
      shortcut: "L",
    },
    {
      label: "Enviar Email",
      icon: Mail,
      action: () => {
        window.open("mailto:gbmesquitadev@gmail.com");
        onOpenChange(false);
      },
      shortcut: "E",
    },
    {
      label: "Ver Código",
      icon: Eye,
      action: () => {
        window.open("https://github.com/Gbmesquita-costa");
        onOpenChange(false);
      },
      shortcut: "S",
    },
  ];

  const navigationCommands = [
    { label: "Início", icon: Home, path: "/", shortcut: "H" },
    { label: "Sobre", icon: User, path: "/about", shortcut: "A" },
    { label: "Blog", icon: FileText, path: "/blog", shortcut: "B" },
    { label: "Ferramentas", icon: Monitor, path: "/uses", shortcut: "U" },
    { label: "Lembrete", icon: Clock, path: "/reminder", shortcut: "R" },
  ];

  const socialCommands = [
    {
      label: "Twitter",
      icon: Twitter,
      action: () => window.open("https://twitter.com/Gabriel84285663"),
      shortcut: "T",
    },
    {
      label: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/Gbmesquita-costa"),
      shortcut: "G",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      action: () =>
        window.open("https://www.linkedin.com/in/gabriel-mesquita-635600223/"),
      shortcut: "N",
    },
    {
      label: "Instagram",
      icon: Instagram,
      action: () => window.open("https://instagram.com/gb.mesquita"),
      shortcut: "I",
    },
  ];

  const handleSelect = (command: any) => {
    if (command.path) {
      navigate.push(command.path);
    } else if (command.action) {
      command.action();
    }

    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Digite um comando ou pesquise..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

        <CommandGroup heading="GERAL" className="my-1">
          {generalCommands.map((command) => (
            <CommandItem
              key={command.label}
              onSelect={() => handleSelect(command)}
              className="flex items-center gap-2"
            >
              <command.icon className="w-4 h-4" />
              <span>{command.label}</span>
              {command.shortcut && (
                <kbd
                  className="ml-auto pointer-events-none inline-flex h-5 select-none 
                  items-center gap-1 rounded border bg-muted px-1.5 font-mono text-sm 
                  font-medium text-muted-foreground opacity-100"
                >
                  {command.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="IR PARA" className="my-1">
          {navigationCommands.map((command) => (
            <CommandItem
              key={command.label}
              onSelect={() => handleSelect(command)}
              className="flex items-center gap-2"
            >
              <command.icon className="w-4 h-4" />
              <span>{command.label}</span>
              {command.shortcut && (
                <kbd
                  className="ml-auto pointer-events-none inline-flex h-5 
                  select-none items-center gap-1 rounded border bg-muted px-1.5 
                  font-mono text-sm font-medium text-muted-foreground opacity-100"
                >
                  G {command.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="SOCIAL" className="my-1">
          {socialCommands.map((command) => (
            <CommandItem
              key={command.label}
              onSelect={() => handleSelect(command)}
              className="flex items-center gap-2"
            >
              <command.icon className="w-4 h-4" />
              <span>{command.label}</span>
              {command.shortcut && (
                <kbd
                  className="ml-auto pointer-events-none inline-flex h-5 
                  select-none items-center gap-1 rounded border bg-muted px-1.5 
                  font-mono text-sm font-medium text-muted-foreground opacity-100"
                >
                  {command.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export { CommandPalette };
