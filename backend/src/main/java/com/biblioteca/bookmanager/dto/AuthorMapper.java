package com.biblioteca.bookmanager.dto;

import com.biblioteca.bookmanager.model.Author;

public class AuthorMapper {

    public static AuthorDTO toDTO(Author author) {
        return new AuthorDTO(
            author.getId(),
            author.getName(),
            author.getNationality()
        );
    }

    public static Author toEntity(AuthorDTO dto) {
        Author author = new Author();
        author.setId(dto.getId());
        author.setName(dto.getName());
        author.setNationality(dto.getNationality());
        return author;
    }
}
