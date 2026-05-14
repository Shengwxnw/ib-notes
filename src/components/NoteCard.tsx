import Link from "next/link";
import { Note } from "@/lib/notes";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link
      href={`/topics/${note.slug}`}
      className="block p-4 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-xs text-gray-400">
          {note.meta.code}
        </span>
        {note.meta.hlOnly && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
            HL
          </span>
        )}
      </div>
      <h3 className="font-semibold text-sm text-gray-800">{note.meta.title}</h3>
      <p className="text-xs text-gray-400 mt-1">
        {note.meta.section}
      </p>
    </Link>
  );
}
