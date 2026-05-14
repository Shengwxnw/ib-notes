import Link from "next/link";
import { syllabus, codeToSlug } from "@/lib/syllabus";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight text-gray-800">
          IB Computer Science Notes
        </h1>
        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
          Study notes organised by the official syllabus. Click any topic to view or write notes.
        </p>
      </section>

      <div className="space-y-10">
        {syllabus.map((theme) => (
          <section key={theme.code}>
            <h2 className="text-2xl font-bold mb-1 text-gray-800">
              Theme {theme.code}: {theme.title}
            </h2>

            <div className="space-y-6 mt-4">
              {theme.sections.map((section) => (
                <div
                  key={section.code}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h3 className="font-semibold text-base text-gray-700">
                      {section.code} — {section.title}
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {section.topics.map((topic) => (
                      <li key={topic.code}>
                        <Link
                          href={`/topics/${codeToSlug(topic.code)}`}
                          className="flex items-center justify-between px-5 py-3 hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm text-gray-700">
                            <span className="font-mono text-gray-400 mr-3">
                              {topic.code}
                            </span>
                            {topic.title}
                          </span>
                          {topic.hlOnly && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                              HL
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
