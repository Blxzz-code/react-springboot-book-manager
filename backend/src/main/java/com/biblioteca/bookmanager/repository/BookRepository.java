package com.biblioteca.bookmanager.repository;

import com.biblioteca.bookmanager.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
