import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { VideoModal } from "./components/VideoModal";
import { HomePage } from "./pages/HomePage";
import { TutorialsPage } from "./pages/TutorialsPage";

type ThemeScheme = "light" | "dark";

const THEME_STORAGE_KEY = "tectriad-theme";
const LEGACY_THEME_STORAGE_KEYS = ["tech-triad-theme", "ethics-theme"] as const;

function readStoredOverride(): ThemeScheme | null {
  if (typeof window === "undefined") return null;
  try {
    const saved =
      localStorage.getItem(THEME_STORAGE_KEY) ||
      LEGACY_THEME_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function ScrollHandler() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? "auto" : "smooth";

    if (hash) {
      const targetId = hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior, block: "start" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const frame = window.requestAnimationFrame(() => {
          scrollToTarget();
        });
        return () => window.cancelAnimationFrame(frame);
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key]);

  return null;
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
      if (
        e.key === THEME_STORAGE_KEY ||
        LEGACY_THEME_STORAGE_KEYS.includes(e.key as (typeof LEGACY_THEME_STORAGE_KEYS)[number])
      ) {
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
        LEGACY_THEME_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
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
      <ScrollHandler />

      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>

      <Navbar theme={resolvedTheme} onToggleTheme={handleToggleTheme} />

      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenVideoModal={handleOpenVideo} />}
          />
          <Route
            path="/tutorials"
            element={<TutorialsPage onOpenVideoModal={handleOpenVideo} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
