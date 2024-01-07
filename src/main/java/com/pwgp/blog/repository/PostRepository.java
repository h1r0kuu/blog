package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Post;
import com.pwgp.blog.entity.Tag;
import com.pwgp.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Optional<Post> findByTitle(String title);

    List<Post> findAllByOrderByCreatedAtDesc();

    @Query("SELECT CASE WHEN :user member of p.views THEN true ELSE false END FROM Post p WHERE p.id = :post_id")
    boolean isUserViewed(@Param("user") User user, @Param("post_id") Long post_id);

    List<Post> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String searchQuery);
    List<Post> findByCreatorUsername(String username);
    List<Post> findAllByTitleContainingIgnoreCaseAndTagsInOrderByCreatedAtDesc(String title, Set<Tag> tags);

    List<Post> findAllByTagsInOrderByCreatedAtDesc(Set<Tag> tagIds);

    List<Post> findAllByCreator(User creator);



}
