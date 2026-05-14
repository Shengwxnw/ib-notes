export interface Topic {
  code: string;
  title: string;
  hlOnly?: boolean;
}

export interface Section {
  code: string;
  title: string;
  topics: Topic[];
}

export interface Theme {
  code: string;
  title: string;
  sections: Section[];
}

export const syllabus: Theme[] = [
  {
    code: "A",
    title: "Concepts of computer science",
    sections: [
      {
        code: "A1",
        title: "Computer fundamentals",
        topics: [
          { code: "A1.1", title: "Computer hardware and operation" },
          { code: "A1.2", title: "Data representation and computer logic" },
          { code: "A1.3", title: "Operating systems and control systems" },
          { code: "A1.4", title: "Translation", hlOnly: true },
        ],
      },
      {
        code: "A2",
        title: "Networks",
        topics: [
          { code: "A2.1", title: "Network fundamentals" },
          { code: "A2.2", title: "Network architecture" },
          { code: "A2.3", title: "Data transmissions" },
          { code: "A2.4", title: "Network security" },
        ],
      },
      {
        code: "A3",
        title: "Databases",
        topics: [
          { code: "A3.1", title: "Database fundamentals" },
          { code: "A3.2", title: "Database design" },
          { code: "A3.3", title: "Database programming" },
          { code: "A3.4", title: "Alternative databases and data warehouses", hlOnly: true },
        ],
      },
      {
        code: "A4",
        title: "Machine learning",
        topics: [
          { code: "A4.1", title: "Machine learning fundamentals" },
          { code: "A4.2", title: "Data preprocessing", hlOnly: true },
          { code: "A4.3", title: "Machine learning approaches", hlOnly: true },
          { code: "A4.4", title: "Ethical considerations" },
        ],
      },
    ],
  },
  {
    code: "B",
    title: "Computational thinking and problem-solving",
    sections: [
      {
        code: "B1",
        title: "Computational thinking",
        topics: [
          { code: "B1.1", title: "Approaches to computational thinking" },
        ],
      },
      {
        code: "B2",
        title: "Programming",
        topics: [
          { code: "B2.1", title: "Programming fundamentals" },
          { code: "B2.2", title: "Data structures" },
          { code: "B2.3", title: "Programming constructs" },
          { code: "B2.4", title: "Programming algorithms" },
          { code: "B2.5", title: "File processing" },
        ],
      },
      {
        code: "B3",
        title: "Object-oriented programming (OOP)",
        topics: [
          { code: "B3.1", title: "Fundamentals of OOP for a single class" },
          { code: "B3.2", title: "Fundamentals of OOP for multiple classes", hlOnly: true },
        ],
      },
      {
        code: "B4",
        title: "Abstract data types (ADTs)",
        topics: [
          { code: "B4.1", title: "Fundamentals of ADTs", hlOnly: true },
        ],
      },
    ],
  },
];

export function getAllTopics(): Topic[] {
  return syllabus.flatMap((theme) =>
    theme.sections.flatMap((section) => section.topics)
  );
}

export function getTopicByCode(code: string): Topic | undefined {
  return getAllTopics().find((t) => t.code === code);
}

export function codeToSlug(code: string): string {
  return code.toLowerCase().replace(/\./g, "-");
}

export function slugToCode(slug: string): string {
  return slug.toUpperCase().replace(/-/g, ".");
}

export function getTopicBySlug(slug: string): Topic | undefined {
  const code = slugToCode(slug);
  return getTopicByCode(code);
}
