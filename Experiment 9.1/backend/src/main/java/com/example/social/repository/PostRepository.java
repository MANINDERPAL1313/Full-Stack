package com.example.social.repository;
import com.example.social.model.SocialPost; import org.springframework.data.jpa.repository.JpaRepository; import java.time.LocalDateTime; import java.util.List;
public interface PostRepository extends JpaRepository<SocialPost,Long>{ List<SocialPost> findByOwnerEmailOrderByCreatedAtDesc(String email); List<SocialPost> findByStatusAndScheduledAtBefore(SocialPost.Status status, LocalDateTime time); long countByOwnerEmail(String email); long countByOwnerEmailAndStatus(String email, SocialPost.Status status); }
