package com.pwgp.blog.entity;



import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "\"posts\"")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "posterUrl")
    private String posterUrl;

    @Column(name="Description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "body", columnDefinition = "TEXT")
    private String body;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    private Set<Tag> tags = new HashSet<Tag>();

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User creator;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.DETACH)
    private Set<User> views = new HashSet<User>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Mark> marks = new HashSet<Mark>();

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}