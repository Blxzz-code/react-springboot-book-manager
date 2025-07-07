import React from "react";
import styles from "./AuthorList.module.css";

export default function AuthorList({
  className,
  authors,
  onDelete,
  onSelect,
  selectedAuthorId,
  filter,
  setFilter,
}) {
  return (
    <section className={`${styles.authorList} ${className || ""}`}>
      <h2 className={styles.title}>Autores</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar autor..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className={styles.list}>
        {authors.map((author) => (
          <li
            key={author.id}
            className={`${styles.item} ${
              author.id === selectedAuthorId ? styles.selected : ""
            }`}
            onClick={() => onSelect(author.id)}
          >
            <span>{author.name}</span>
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(author.id);
              }}
              title="Eliminar autor"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
