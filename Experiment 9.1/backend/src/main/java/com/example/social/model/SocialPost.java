package com.example.social.model;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="social_posts")
public class SocialPost {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=2000) private String content;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Status status=Status.DRAFT;
 private LocalDateTime scheduledAt; private LocalDateTime createdAt=LocalDateTime.now();
 @ManyToOne(optional=false) private AppUser owner;
 protected SocialPost() {}
 public SocialPost(String content,LocalDateTime scheduledAt,AppUser owner){this.content=content;this.scheduledAt=scheduledAt;this.owner=owner;this.status=scheduledAt==null?Status.DRAFT:Status.SCHEDULED;}
 public Long getId(){return id;} public String getContent(){return content;} public Status getStatus(){return status;} public LocalDateTime getScheduledAt(){return scheduledAt;} public LocalDateTime getCreatedAt(){return createdAt;} public AppUser getOwner(){return owner;} public void setStatus(Status s){status=s;}
 public enum Status { DRAFT, SCHEDULED, PUBLISH_REQUESTED }
}
