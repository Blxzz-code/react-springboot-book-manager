package com.biblioteca.bookmanager.controller;

import com.biblioteca.bookmanager.dto.AuthorDTO;
import com.biblioteca.bookmanager.dto.AuthorMapper;
import com.biblioteca.bookmanager.model.Author;
import com.biblioteca.bookmanager.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll()
                .stream()
                .map(AuthorMapper::toDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public AuthorDTO getAuthorById(@PathVariable Long id) {
        return authorRepository.findById(id)
                .map(AuthorMapper::toDTO)
                .orElse(null);
    }

    @PostMapping
    public AuthorDTO createAuthor(@RequestBody AuthorDTO dto) {
        Author author = AuthorMapper.toEntity(dto);
        Author saved = authorRepository.save(author);
        return AuthorMapper.toDTO(saved);
    }

    @PutMapping("/{id}")
    public AuthorDTO updateAuthor(@PathVariable Long id, @RequestBody AuthorDTO dto) {
        return authorRepository.findById(id)
                .map(existing -> {
                    existing.setName(dto.getName());
                    existing.setNationality(dto.getNationality());
                    Author updated = authorRepository.save(existing);
                    return AuthorMapper.toDTO(updated);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) {
        authorRepository.deleteById(id);
    }
}
