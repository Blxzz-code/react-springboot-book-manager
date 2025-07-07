import React from "react";
import styles from "./BookList.module.css";

export default function BookList({
  className,
  books,
  authors,
  onDelete,
  filter,
  setFilter,
  selectedAuthorId,
}) {
  return (
    <section className={`${styles.bookList} ${className || ""}`}>
      <h2 className={styles.title}>Libros</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar libro..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className={styles.list}>
        {books.map((book) => {
          const author = authors.find((a) => a.id === book.authorId);
          return (
            <li
              key={book.id}
              className={styles.item}
              title={author ? author.name : ""}
            >
              <span>{book.title} 
                <small className={styles.authorName}>({author ? author.name : "Autor desconocido"})</small></span>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(book.id)}
                title="Eliminar libro"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
