import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllTopics, codeToSlug, slugToCode } from "./syllabus";

export interface NoteMeta {
  title: string;
  code: string;
  section: string;
  theme: string;
  hlOnly?: boolean;
}

export interface Note {
  slug: string;
  meta: NoteMeta;
  content: string;
}

const notesDirectory = path.join(process.cwd(), "content", "notes");

function getSectionName(code: string): string {
  const prefix = code.slice(0, 2);
  const names: Record<string, string> = {
    A1: "Computer fundamentals",
    A2: "Networks",
    A3: "Databases",
    A4: "Machine learning",
    B1: "Computational thinking",
    B2: "Programming",
    B3: "Object-oriented programming (OOP)",
    B4: "Abstract data types (ADTs)",
  };
  return names[prefix] || prefix;
}

export function getAllNotes(): Note[] {
  const topics = getAllTopics();
  const notes: Note[] = [];

  for (const topic of topics) {
    const slug = codeToSlug(topic.code);
    const fullPath = path.join(notesDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      notes.push({
        slug,
        meta: {
          title: topic.title,
          code: topic.code,
          section: getSectionName(topic.code),
          theme: topic.code.startsWith("A") ? "A" : "B",
          hlOnly: topic.hlOnly,
        },
        content: "",
      });
      continue;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    notes.push({
      slug,
      meta: {
        title: data.title || topic.title,
        code: data.code || topic.code,
        section: data.section || getSectionName(topic.code),
        theme: data.theme || (topic.code.startsWith("A") ? "A" : "B"),
        hlOnly: data.hlOnly ?? topic.hlOnly,
      },
      content,
    });
  }

  return notes.sort((a, b) => a.meta.code.localeCompare(b.meta.code));
}

export function getNoteBySlug(slug: string): Note | null {
  const code = slugToCode(slug);
  const topic = getAllTopics().find((t) => t.code === code);
  if (!topic) return null;

  const fullPath = path.join(notesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return {
      slug,
      meta: {
        title: topic.title,
        code: topic.code,
        section: getSectionName(topic.code),
        theme: topic.code.startsWith("A") ? "A" : "B",
        hlOnly: topic.hlOnly,
      },
      content: "",
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: {
      title: data.title || topic.title,
      code: data.code || topic.code,
      section: data.section || getSectionName(topic.code),
      theme: data.theme || (topic.code.startsWith("A") ? "A" : "B"),
      hlOnly: data.hlOnly ?? topic.hlOnly,
    },
    content,
  };
}

export function searchNotes(query: string): Note[] {
  const term = query.toLowerCase();
  return getAllNotes().filter(
    (n) =>
      n.meta.title.toLowerCase().includes(term) ||
      n.meta.code.toLowerCase().includes(term) ||
      n.meta.section.toLowerCase().includes(term) ||
      n.content.toLowerCase().includes(term)
  );
}
