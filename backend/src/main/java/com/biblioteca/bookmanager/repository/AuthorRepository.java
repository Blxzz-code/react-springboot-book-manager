package com.biblioteca.bookmanager.repository;

import com.biblioteca.bookmanager.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
