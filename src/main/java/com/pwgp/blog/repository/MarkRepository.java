package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {

    Mark findByPostIdAndUserId(Long postId, Long userId);

}
