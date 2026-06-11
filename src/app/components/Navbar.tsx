import { useEffect, useRef, useState } from "react";
import { Compass, Menu, X } from "lucide-react";

const TOP_REVEAL_THRESHOLD = 72;
const TOP_HIDE_THRESHOLD = 112;
const EDGE_LEAVE_DELAY = 160;
const TOUCH_REVEAL_DURATION = 2200;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNearTop, setIsNearTop] = useState(true);
  const [isEdgeHovered, setIsEdgeHovered] = useState(false);
  const [isTapRevealActive, setIsTapRevealActive] = useState(false);
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);
  const [isNavbarFocused, setIsNavbarFocused] = useState(false);
  const scrollFrameRef = useRef<number | null>(null);
  const edgeHideTimerRef = useRef<number | null>(null);
  const touchRevealTimerRef = useRef<number | null>(null);
  const navItems = [
    { href: "#", label: "Home" },
    { href: "#featured", label: "Featured" },
    { href: "#globe", label: "Globe", accent: true },
    { href: "#about", label: "About" },
    { href: "#group-information", label: "Group" },
    { href: "#sources", label: "Sources" },
  ];

  const clearEdgeHideTimer = () => {
    if (edgeHideTimerRef.current !== null) {
      window.clearTimeout(edgeHideTimerRef.current);
      edgeHideTimerRef.current = null;
    }
  };

  const clearTouchRevealTimer = () => {
    if (touchRevealTimerRef.current !== null) {
      window.clearTimeout(touchRevealTimerRef.current);
      touchRevealTimerRef.current = null;
    }
  };

  const revealFromTopEdge = () => {
    clearEdgeHideTimer();
    setIsEdgeHovered(true);
  };

  const hideEdgeRevealAfterDelay = () => {
    clearEdgeHideTimer();
    edgeHideTimerRef.current = window.setTimeout(() => {
      setIsEdgeHovered(false);
      edgeHideTimerRef.current = null;
    }, EDGE_LEAVE_DELAY);
  };

  const handleTopEdgePointerEnter = (pointerType: string) => {
    if (pointerType === "mouse") {
      revealFromTopEdge();
    }
  };

  const handleTopEdgePointerLeave = (pointerType: string) => {
    if (pointerType === "mouse") {
      hideEdgeRevealAfterDelay();
    }
  };

  const handleTopEdgePointerDown = (pointerType: string) => {
    if (pointerType === "mouse") return;

    setIsTapRevealActive(true);
    clearTouchRevealTimer();
    touchRevealTimerRef.current = window.setTimeout(() => {
      setIsTapRevealActive(false);
      touchRevealTimerRef.current = null;
    }, TOUCH_REVEAL_DURATION);
  };

  const handleTopEdgeClick = () => {
    setIsTapRevealActive(true);
    clearTouchRevealTimer();
    touchRevealTimerRef.current = window.setTimeout(() => {
      setIsTapRevealActive(false);
      touchRevealTimerRef.current = null;
    }, TOUCH_REVEAL_DURATION);
  };

  useEffect(() => {
    const updateTopState = () => {
      setIsNearTop((currentlyNearTop) =>
        currentlyNearTop
          ? window.scrollY <= TOP_HIDE_THRESHOLD
          : window.scrollY <= TOP_REVEAL_THRESHOLD,
      );
      scrollFrameRef.current = null;
    };

    const handleScroll = () => {
      if (scrollFrameRef.current === null) {
        scrollFrameRef.current = window.requestAnimationFrame(updateTopState);
      }
    };

    updateTopState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
      clearEdgeHideTimer();
      clearTouchRevealTimer();
    };
  }, []);

  const isNavbarVisible =
    isNearTop ||
    isEdgeHovered ||
    isTapRevealActive ||
    isNavbarHovered ||
    isNavbarFocused ||
    isMenuOpen;

  return (
    <>
      <div
        className="navbar-reveal-zone"
        aria-hidden="true"
        onPointerEnter={(event) => handleTopEdgePointerEnter(event.pointerType)}
        onPointerLeave={(event) => handleTopEdgePointerLeave(event.pointerType)}
        onPointerDown={(event) => handleTopEdgePointerDown(event.pointerType)}
        onClick={handleTopEdgeClick}
      />

      <nav
        className={`navbar-auto-hide fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4 ${
          isNavbarVisible ? "is-navbar-visible" : "is-navbar-hidden"
        }`}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            clearEdgeHideTimer();
            setIsNavbarHovered(true);
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setIsNavbarHovered(false);
            hideEdgeRevealAfterDelay();
          }
        }}
        onFocusCapture={() => {
          clearEdgeHideTimer();
          setIsNavbarFocused(true);
        }}
        onBlurCapture={(event) => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setIsNavbarFocused(false);
          hideEdgeRevealAfterDelay();
        }}
      >
        <div className="glass-panel navbar-shell mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
          <a
            href="#"
            className="flex min-w-0 items-center gap-3 text-white md:gap-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="glass-chip-warm flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-10 md:w-10">
              <Compass className="h-4.5 w-4.5 text-[#f4c430] md:h-5 md:w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[9px] uppercase tracking-[0.18em] text-slate-300/80 md:text-[10px] md:tracking-[0.35em]">
                Contemporary Filipino art
              </p>
              <span className="section-title block truncate text-sm tracking-wide md:text-base">
                Identity Beyond Borders
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-1 text-xs text-slate-200/85 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`min-h-11 rounded-full px-3 py-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] ${
                  item.accent
                    ? "glass-chip-warm text-white"
                    : "glass-chip hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="glass-chip navbar-menu-toggle ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] lg:hidden"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="navbar-mobile-menu glass-panel mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-[1.25rem] p-3 text-sm text-slate-200/90 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-full px-3 py-2.5 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] ${
                  item.accent
                    ? "glass-chip-warm text-white"
                    : "glass-chip hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};
