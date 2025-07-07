import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function AddBookModal({ onClose, onAdd, authors }) {
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    if (authors.length > 0) {
      setAuthorId(authors[0].id);
    }
  }, [authors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd(title, authorId)) {
      setTitle("");
      setAuthorId(authors.length > 0 ? authors[0].id : "");
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h3>Añadir Libro</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título del libro"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
          <select
            className={styles.select}
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            required
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <div className={styles.buttons}>
            <button type="submit" className={styles.addButton}>
              Añadir
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
