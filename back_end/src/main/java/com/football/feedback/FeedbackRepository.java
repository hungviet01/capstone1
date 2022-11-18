package com.football.feedback;

import com.football.feedback.Feedback;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface FeedbackRepository extends JpaRepository<Feedback, String> {

    @Query("SELECT f FROM Feedback f" +
            " WHERE (:user IS NULL OR (f.fullName LIKE :user OR f.email LIKE :user OR f.phone LIKE :user))" +
            " AND (:createdDate IS NULL OR f.createdDate = :createdDate)")
    Page<Feedback> searchFeedback(
            @Param("user") String user,
            @Param("createdDate")Date createdDate,
            Pageable pageable
    );
}