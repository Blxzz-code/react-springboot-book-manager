package com.biblioteca.bookmanager.dto;

public class BookDTO {
    private Long id;
    private String title;
    private int publicationYear;
    private Long authorId;

    public BookDTO() {
    }

    public BookDTO(Long id, String title, int publicationYear, Long authorId) {
        this.id = id;
        this.title = title;
        this.publicationYear = publicationYear;
        this.authorId = authorId;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }
}
