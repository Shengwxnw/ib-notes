export interface ResourceLink {
  title: string;
  url: string;
  description?: string;
}

export interface ResourceCategory {
  name: string;
  description?: string;
  links: ResourceLink[];
}

export const resources: ResourceCategory[] = [
  {
    name: "IB Documentation",
    description: "Official IB resources and guides for Computer Science.",
    links: [
      {
        title: "IB Computer Science Subject Guide",
        url: "https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/computer-science/",
        description:
          "Official IB Computer Science curriculum page with subject overview.",
      },
    ],
  },
  {
    name: "Programming Practice",
    description: "Platforms to practice coding and algorithmic thinking.",
    links: [
      {
        title: "LeetCode",
        url: "https://leetcode.com",
        description:
          "Practice coding problems and prepare for interviews.",
      },
      {
        title: "HackerRank",
        url: "https://www.hackerrank.com",
        description:
          "Coding challenges and competitions across multiple domains.",
      },
      {
        title: "Codecademy",
        url: "https://www.codecademy.com",
        description:
          "Interactive courses for learning programming languages.",
      },
    ],
  },
  {
    name: "Reference & Documentation",
    description: "Language references, docs, and cheat sheets.",
    links: [
      {
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "Comprehensive web development documentation by Mozilla.",
      },
      {
        title: "W3Schools",
        url: "https://www.w3schools.com",
        description:
          "Beginner-friendly tutorials and references for web technologies.",
      },
    ],
  },
];
