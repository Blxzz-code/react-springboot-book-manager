package com.biblioteca.bookmanager.dto;

import com.biblioteca.bookmanager.model.Book;
import com.biblioteca.bookmanager.model.Author;

public class BookMapper {

    public static BookDTO toDTO(Book book) {
        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getPublicationYear(),
                book.getAuthor() != null ? book.getAuthor().getId() : null
        );
    }

    public static Book toEntity(BookDTO dto, Author author) {
        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setPublicationYear(dto.getPublicationYear());
        book.setAuthor(author);
        return book;
    }
}
