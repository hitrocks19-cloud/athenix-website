"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

type WebinarModalContextValue = {
  isOpen: boolean;
  hasBeenOpened: boolean;
  selectedWebinarSlug: string | undefined;
  selectedCourseInterest: string | undefined;
  open: (webinarSlug?: string, courseInterest?: string) => void;
  close: () => void;
};

const WebinarModalContext = createContext<WebinarModalContextValue | null>(null);

export function WebinarModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [selectedWebinarSlug, setSelectedWebinarSlug] = useState<string | undefined>(undefined);
  const [selectedCourseInterest, setSelectedCourseInterest] = useState<string | undefined>(undefined);

  const open = useCallback((webinarSlug?: string, courseInterest?: string) => {
    setSelectedWebinarSlug(webinarSlug);
    setSelectedCourseInterest(courseInterest);
    setIsOpen(true);
    setHasBeenOpened(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, hasBeenOpened, selectedWebinarSlug, selectedCourseInterest, open, close }),
    [isOpen, hasBeenOpened, selectedWebinarSlug, selectedCourseInterest, open, close]
  );

  return <WebinarModalContext.Provider value={value}>{children}</WebinarModalContext.Provider>;
}

export function useWebinarModal() {
  const ctx = useContext(WebinarModalContext);
  if (!ctx) throw new Error("useWebinarModal must be used within WebinarModalProvider");
  return ctx;
}
