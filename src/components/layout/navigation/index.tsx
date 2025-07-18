"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";

import { CommandPalette } from "./command-palette";

const Navigation = () => {
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  const location = usePathname();
  const router = useRouter();

  // ----------------------------------------------------------------
  // 1. “G → X” map for navigation
  // ----------------------------------------------------------------
  const shortcutToPathMap: Record<string, string> = {
    H: "/", // G → H = Home
    A: "/about", // G → A = About
    B: "/blog", // G → B = Blog
    U: "/uses", // G → U = Uses
    R: "/reminder", // G → R = Reminder
  };

  // ----------------------------------------------------------------
  // 2. Single keymap (no “G →”) for general and social actions
  // ----------------------------------------------------------------
  const singleKeyActions: Record<string, () => void> = {
    // === GENERAL COMMANDS ===
    L: () => {
      navigator.clipboard.writeText(window.location.href);
      setIsCommandOpen(false);
    },
    E: () => {
      window.open("mailto:gbmesquitadev@gmail.com");
      setIsCommandOpen(false);
    },
    S: () => {
      window.open("https://github.com/Gbmesquita-costa");
      setIsCommandOpen(false);
    },

    // === SOCIAL COMMANDS ===
    T: () => {
      window.open("https://twitter.com/Gabriel84285663");
      setIsCommandOpen(false);
    },
    G: () => {
      // “G” alone (not followed by another key) opens GitHub
      window.open("https://github.com/Gbmesquita-costa");
      setIsCommandOpen(false);
    },
    N: () => {
      window.open("https://www.linkedin.com/in/gabriel-mesquita-635600223/");
      setIsCommandOpen(false);
    },
    I: () => {
      window.open("https://instagram.com/gb.mesquita");
      setIsCommandOpen(false);
    },
  };

  // ----------------------------------------------------------------
  // 3. useRef to control whether “G” has already been pressed (navigation prefix)
  // ----------------------------------------------------------------
  const gPressedRef = useRef(false);

  // ----------------------------------------------------------------
  // 4. Hook to open/close CommandPalette with Ctrl+K / ⌘+K
  // ----------------------------------------------------------------
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  // ----------------------------------------------------------------
  // 5. Global hook to capture “G → X” and single keys,
  //    but IGNORE if focus is on <input>, <textarea> or contentEditable
  // ----------------------------------------------------------------
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;
      const tag = active?.tagName;

      const isEditingField =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (active instanceof HTMLElement && active.isContentEditable);

      // If the focus is on an editable field, we do not trigger shortcuts
      if (isEditingField) {
        return;
      }

      const key = e.key.toUpperCase();

      // ------------------------------------------------------------
      // a) If I haven't pressed “G” yet (gPressedRef.current === false):
      //    -> check “G” as prefix or single key
      // ------------------------------------------------------------
      if (!gPressedRef.current) {
        // a.1. If it is “G”: starts the sequence “G → X”
        if (key === "G") {
          e.preventDefault();
          gPressedRef.current = true;
          setTimeout(() => {
            gPressedRef.current = false;
          }, 1000);
          return;
        }

        // a.2. If it is a single key mapped to singleKeyActions, trigger action
        if (singleKeyActions[key]) {
          e.preventDefault();
          singleKeyActions[key]!();
          return;
        }

        // Otherwise, ignore any other key.
        return;
      }

      // ------------------------------------------------------------
      // b) If it was already waiting for “G” (gPressedRef.current === true):
      //    -> try to navigate via shortcutToPathMap[key]
      // ------------------------------------------------------------
      if (shortcutToPathMap[key]) {
        e.preventDefault();
        router.push(shortcutToPathMap[key]);
      }

      // In any case, clear the “G prefix” state
      gPressedRef.current = false;
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      gPressedRef.current = false;
    };
  }, [router]);

  // ----------------------------------------------------------------
  // 6. NEW: Listener for CustomEvent “open-command-palette”
  // ----------------------------------------------------------------
  useEffect(() => {
    const abrirPallet = () => {
      setIsCommandOpen(true);
    };

    window.addEventListener("open-command-palette", abrirPallet);
    return () => {
      window.removeEventListener("open-command-palette", abrirPallet);
    };
  }, []);

  // ----------------------------------------------------------------
  // 7. Menu links (for visual rendering only)
  // ----------------------------------------------------------------
  const navItems = [
    { href: "/about", label: "SOBRE" },
    { href: "/blog", label: "BLOG" },
    { href: "/uses", label: "FERRAMENTAS" },
    { href: "/reminder", label: "LEMBRETE" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 
        bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold gradient-text 
              hover:scale-105 transition-transform duration-200"
            >
              GM
            </Link>

            <div
              className="hidden md:flex 
              items-center space-x-8"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors 
                  duration-200 hover:text-green-400 relative group ${
                    location === item.href
                      ? "text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {location === item.href && (
                    <div
                      className="absolute -bottom-1 left-0 right-0 
                      h-0.5 bg-green-400 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCommandOpen(true)}
                className="text-muted-foreground 
                hover:text-foreground cursor-pointer"
              >
                <Command className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </>
  );
};

export default Navigation;
