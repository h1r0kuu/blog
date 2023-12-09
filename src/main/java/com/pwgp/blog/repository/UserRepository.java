package com.pwgp.blog.repository;

import com.pwgp.blog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT CASE WHEN count (u) > 0 THEN true ELSE false END FROM User u WHERE u.username = :username")
    boolean isUserExistByUsername(@Param("username") String username);
    @Query("SELECT CASE WHEN count (u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean isUserExistByEmail(@Param("email") String email);
    <T> Optional<T> findByUsername(String username, Class<T> type);
    Optional<User> findByEmail(String email);
    @Modifying
    @Query("UPDATE User u SET u.password = :newPassword WHERE u.username = :username")
    void updatePassword(@Param("username") String username, @Param("newPassword") String newPassword);
    @Modifying
    @Query("UPDATE User u SET u.username = :username, u.email = :email, u.about = :about, u.avatar = :avatar, u.cover = :cover WHERE u.id = :id")
    void updateGeneralSettings(@Param("id") Long id,
                               @Param("username") String username,
                               @Param("about") String about,
                               @Param("email") String email,
                               @Param("avatar") String avatar,
                               @Param("cover") String cover);
}
