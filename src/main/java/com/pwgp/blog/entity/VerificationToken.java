package com.pwgp.blog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "verification_tokens")
@Entity
@Getter
@Setter
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "token")
    private String token;

    @Column(name = "expired_time")
    private LocalDateTime expiredDateTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public VerificationToken() {
        newToken();
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiredDateTime);
    }

    public void newToken() {
        this.token = UUID.randomUUID().toString();;
        this.expiredDateTime = LocalDateTime.now().plusMinutes(15L);
    }
}