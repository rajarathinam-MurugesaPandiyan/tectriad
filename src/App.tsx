import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProductsSection } from "./components/ProductsSection";
import { YouTubeSection } from "./components/YouTubeSection";
import { MissionSection } from "./components/MissionSection";
import { Footer } from "./components/Footer";
import { VideoModal } from "./components/VideoModal";

type ThemeScheme = "light" | "dark";

const THEME_STORAGE_KEY = "tech-triad-theme";
const LEGACY_THEME_STORAGE_KEY = "ethics-theme";

function readStoredOverride(): ThemeScheme | null {
  if (typeof window === "undefined") return null;
  try {
    const saved =
      localStorage.getItem(THEME_STORAGE_KEY) ||
      localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function App() {
  const [themeOverride, setThemeOverride] = useState<ThemeScheme | null>(
    readStoredOverride
  );
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const resolvedTheme: ThemeScheme =
    themeOverride ?? (systemPrefersDark ? "dark" : "light");

  const [activeVideo, setActiveVideo] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Reflect color scheme override onto <meta name="color-scheme"> and [data-theme]
  useEffect(() => {
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.setAttribute("content", themeOverride ?? "light dark");
    }
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [themeOverride, resolvedTheme]);

  // Keep OS preference synced without overwriting explicit user overrides
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sync theme override across browser tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE_KEY || e.key === LEGACY_THEME_STORAGE_KEY) {
        setThemeOverride(readStoredOverride());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleToggleTheme = () => {
    const target: ThemeScheme = resolvedTheme === "light" ? "dark" : "light";
    const systemCurrent: ThemeScheme = systemPrefersDark ? "dark" : "light";

    try {
      if (target === systemCurrent) {
        localStorage.removeItem(THEME_STORAGE_KEY);
        localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
        setThemeOverride(null);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, target);
        setThemeOverride(target);
      }
    } catch {
      setThemeOverride(target === systemCurrent ? null : target);
    }
  };

  const handleOpenVideo = (videoId: string, videoTitle: string) => {
    setActiveVideo({ id: videoId, title: videoTitle });
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <Navbar theme={resolvedTheme} onToggleTheme={handleToggleTheme} />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProductsSection />
        <YouTubeSection onOpenVideoModal={handleOpenVideo} />
        <MissionSection />
      </main>

      <Footer />

      <VideoModal
        videoId={activeVideo?.id ?? null}
        videoTitle={activeVideo?.title ?? ""}
        onClose={handleCloseVideo}
      />
    </div>
  );
}

export default App;
