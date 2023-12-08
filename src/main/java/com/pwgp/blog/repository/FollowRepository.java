package com.pwgp.blog.repository;

import com.pwgp.blog.entity.Follow;
import com.pwgp.blog.repository.projection.FollowProjection;
import com.pwgp.blog.repository.projection.UserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Follow findByFollower_UsernameAndFollowing_Username(String followerUsername, String followingUsername);
    @Modifying
    Long deleteByFollower_UsernameAndFollowing_Username(String followerUsername, String followingUsername);
    @Query("SELECT u From User u LEFT JOIN u.followers follow WHERE follow.follower.username = :username")
    Page<FollowProjection> findFollowings(@Param("username") String username, Pageable pageable);

    @Query("SELECT u from User u LEFT JOIN u.followings follow WHERE follow.following.username = :username")
    Page<FollowProjection> findFollowers(@Param("username") String username, Pageable pageable);

    @Query("SELECT COUNT(f) from Follow f WHERE f.following.username = :username")
    int countUserFollowersByUserUsername(@Param("username") String username);

    @Query("SELECT COUNT(f) from Follow f WHERE f.follower.username = :username")
    int countUserFollowingsByUserUsername(@Param("username") String username);

    @Query("SELECT CASE WHEN count(f) > 0 THEN true ELSE false END FROM Follow f " +
            "WHERE f.follower.username = :username AND f.following.username = :followingUsername")
    boolean isUserSubscribed(@Param("username") String username, @Param("followingUsername") String followingUsername);
}
