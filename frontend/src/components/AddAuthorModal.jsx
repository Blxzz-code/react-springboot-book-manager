import React, { useState } from "react";
import styles from "./Modal.module.css";

export default function AddAuthorModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && nationality.trim()) {
      onAdd(name.trim(), nationality.trim());
      setName("");
      setNationality("");
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h3>Añadir Autor</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del autor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Nacionalidad"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
          <div className={styles.buttons}>
            <button type="submit" className={styles.addButton}>
              Añadir
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
