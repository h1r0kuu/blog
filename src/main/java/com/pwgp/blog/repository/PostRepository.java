package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByTitle(String title);

    @Query("SELECT CASE WHEN :user member of p.views THEN true ELSE false END FROM Post p WHERE p.id = :post_id")
    boolean isUserViewed(@Param("user") User user, @Param("post_id") Long post_id);
}
