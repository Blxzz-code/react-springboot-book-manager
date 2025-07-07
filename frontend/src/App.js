import React, { useState, useEffect } from "react";
import AuthorList from "./components/AuthorList";
import BookList from "./components/BookList";
import AddAuthorModal from "./components/AddAuthorModal";
import AddBookModal from "./components/AddBookModal";

import styles from "./App.module.css";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  const [isAddAuthorOpen, setAddAuthorOpen] = useState(false);
  const [isAddBookOpen, setAddBookOpen] = useState(false);

  const [authorFilter, setAuthorFilter] = useState("");
  const [bookFilter, setBookFilter] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/authors")
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando autores");
        return res.json();
      })
      .then(setAuthors)
      .catch((e) => setError(e.message));

    fetch("http://localhost:8080/api/books")
      .then((res) => {
        if (!res.ok) throw new Error("Error cargando libros");
        return res.json();
      })
      .then(setBooks)
      .catch((e) => setError(e.message));
  }, []);

  async function addAuthor(name, nationality) {
    if (!name.trim() || !nationality.trim()) return false;
    try {
      const res = await fetch("http://localhost:8080/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), nationality: nationality.trim() }),
      });
      if (!res.ok) throw new Error("Error al añadir autor");
      const newAuthor = await res.json();
      setAuthors((a) => [...a, newAuthor]);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  async function addBook(title, authorId) {
    if (!title.trim() || !authorId) return false;
    try {
      const res = await fetch("http://localhost:8080/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), authorId }),
      });
      if (!res.ok) throw new Error("Error al añadir libro");
      const newBook = await res.json();
      setBooks((b) => [...b, newBook]);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }

  async function deleteAuthor(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/authors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al borrar autor");
      setAuthors((a) => a.filter((author) => author.id !== id));
      setBooks((b) => b.filter((book) => book.authorId !== id));
      if (selectedAuthorId === id) setSelectedAuthorId(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteBook(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al borrar libro");
      setBooks((b) => b.filter((book) => book.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(authorFilter.toLowerCase())
  );

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(bookFilter.toLowerCase());
    const matchesAuthor = selectedAuthorId ? book.authorId === selectedAuthorId : true;
    return matchesTitle && matchesAuthor;
  });

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button className={styles.button} onClick={() => setAddAuthorOpen(true)}>
          Añadir Autor
        </button>
        <button
          className={styles.button}
          disabled={authors.length === 0}
          onClick={() => setAddBookOpen(true)}
          title={authors.length === 0 ? "Añade un autor primero" : ""}
        >
          Añadir Libro
        </button>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}

        <AuthorList
          authors={filteredAuthors}
          onDelete={deleteAuthor}
          onSelect={setSelectedAuthorId}
          selectedAuthorId={selectedAuthorId}
          filter={authorFilter}
          setFilter={setAuthorFilter}
        />

        <BookList
          books={filteredBooks}
          authors={authors}
          onDelete={deleteBook}
          filter={bookFilter}
          setFilter={setBookFilter}
          selectedAuthorId={selectedAuthorId}
        />
      </main>

      {isAddAuthorOpen && (
        <AddAuthorModal
          onClose={() => setAddAuthorOpen(false)}
          onAdd={async (name, nationality) => {
            if (await addAuthor(name, nationality)) setAddAuthorOpen(false);
          }}
        />
      )}

      {isAddBookOpen && (
        <AddBookModal
          onClose={() => setAddBookOpen(false)}
          onAdd={async (title, authorId) => {
            if (await addBook(title, authorId)) setAddBookOpen(false);
          }}
          authors={authors}
        />
      )}
    </div>
  );
}
