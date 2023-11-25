package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Category;
import com.pwgp.blog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String title);
}
