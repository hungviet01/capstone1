package com.football.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_USER")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "full_name")
    @NotBlank
    private String fullName;

    @Column(name = "username", nullable = false, length = 300)
    @NotBlank
    private String username;

    @Lob
    @Column(name = "password", nullable = false)
    @NotBlank
    private String password;

    @Column(name = "phone", nullable = false, length = 20)
    @NotBlank
    private String phone;

    @Column(name = "email", nullable = false, length = 100)
    @NotBlank
    private String email;

    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "otp_code")
    private String otpCode;

    @Column(name = "role")
    private String role;
}