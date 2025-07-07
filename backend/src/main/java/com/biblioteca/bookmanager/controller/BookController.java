package com.biblioteca.bookmanager.controller;

import com.biblioteca.bookmanager.dto.BookDTO;
import com.biblioteca.bookmanager.dto.BookMapper;
import com.biblioteca.bookmanager.model.Author;
import com.biblioteca.bookmanager.model.Book;
import com.biblioteca.bookmanager.repository.AuthorRepository;
import com.biblioteca.bookmanager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream()
                .map(BookMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public BookDTO getBookById(@PathVariable Long id) {
        return bookRepository.findById(id)
                .map(BookMapper::toDTO)
                .orElse(null);
    }

    @PostMapping
    public BookDTO createBook(@RequestBody BookDTO dto) {
        Author author = authorRepository.findById(dto.getAuthorId()).orElse(null);
        if (author == null) return null;

        Book book = BookMapper.toEntity(dto, author);
        Book saved = bookRepository.save(book);
        return BookMapper.toDTO(saved);
    }

    @PutMapping("/{id}")
    public BookDTO updateBook(@PathVariable Long id, @RequestBody BookDTO dto) {
        return bookRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(dto.getTitle());
                    existing.setPublicationYear(dto.getPublicationYear());

                    Author author = authorRepository.findById(dto.getAuthorId()).orElse(null);
                    existing.setAuthor(author);

                    return BookMapper.toDTO(bookRepository.save(existing));
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}
