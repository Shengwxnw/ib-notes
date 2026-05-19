import type { Metadata } from "next";
import { resources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Resources</h1>
      <p className="text-gray-500 mb-8">
        Useful links and references for IB Computer Science.
      </p>

      <div className="space-y-8">
        {resources.map((category) => (
          <section key={category.name}>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-sm text-gray-500 mb-4">
                {category.description}
              </p>
            )}

            <ul className="space-y-3">
              {category.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 rounded-lg px-5 py-4 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                  >
                    <span className="font-medium text-blue-600 hover:text-blue-700">
                      {link.title}
                    </span>
                    {link.description && (
                      <span className="block text-sm text-gray-500 mt-0.5">
                        {link.description}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
