package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String title);
    Tag findByNameIgnoreCase(String title);
}