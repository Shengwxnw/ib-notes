import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import TableOfContents from "@/components/TableOfContents";

type Props = {
  params: Promise<{ slug: string }>;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return { title: "Topic not found" };

  return {
    title: `${note.meta.code} ${note.meta.title}`,
    description: `IB CS notes for ${note.meta.code}: ${note.meta.title}`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block"
      >
        &larr; Syllabus
      </Link>

      <div className="flex gap-10">
        <article className="min-w-0 flex-1">
          <header className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-gray-500">
                {note.meta.code}
              </span>
              {note.meta.hlOnly && (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                  HL ONLY
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-1 text-gray-800">{note.meta.title}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Theme {note.meta.theme} &middot; {note.meta.section}
            </p>
          </header>

          {note.content ? (
            <div className="prose max-w-none text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({ children, ...props }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = extractText(children);
                    const id = slugify(text);
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                  img: ({ src, alt, ...props }) => (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="max-w-full rounded-lg border border-gray-200 my-4"
                      loading="lazy"
                      {...props}
                    />
                  ),
                }}
              >
                {note.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">No notes yet.</p>
              <p className="text-sm">
                Edit{" "}
                <code className="text-xs bg-gray-100 px-1 py-0.5 rounded text-gray-600">
                  content/notes/{note.slug}.md
                </code>{" "}
                to add your notes for this topic.
              </p>
            </div>
          )}
        </article>

        {note.content && <TableOfContents content={note.content} />}
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          &larr; Back to syllabus
        </Link>
      </div>
    </div>
  );
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}
