"use client";

import { useState, useEffect } from "react";

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings, content]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-20 w-56 shrink-0 self-start">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        On this page
      </h4>
      <ul className="space-y-1 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <button
              onClick={() => scrollTo(h.id)}
              className={`block text-left w-full text-sm py-0.5 transition-colors truncate ${
                h.level === 3 ? "pl-5" : "pl-3"
              } ${
                activeId === h.id
                  ? "text-blue-600 border-l-2 border-blue-600 -ml-px font-medium"
                  : "text-gray-500 hover:text-gray-700 border-l-2 border-transparent -ml-px"
              }`}
            >
              {h.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
