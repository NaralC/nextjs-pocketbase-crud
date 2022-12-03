import Link from "next/link";
import React from "react";

async function getNotes() {
  const response = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30`,
    { cache: "no-store" }
  );
  const data = await response.json();
  return data?.items as any[];
}

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
}

function Note({ note }: any) {
  const { title, content, id, created } = note || {};

  return (
    <>
      <Link href={`/notes/${id}`}>
        <div>
          <h2>{title}</h2>
          <h5>{content}</h5>
          <p>{created}</p>
        </div>
      </Link>
    </>
  );
}
