package com.football.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u " +
            " WHERE (:username IS NULL OR u.username LIKE :username)" +
            " AND (:status IS NULL OR u.status = :status)" +
            " AND (:role IS NULL OR u.role = :role)" +
            " AND (u.role <> 'ADMIN')")
    Page<User> searchUser(
      @Param("username") String username,
      @Param("status") Integer status,
      @Param("role") String role,
      Pageable pageable
    );

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

}