package com.football.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDto implements Serializable {
    private String id;

    @NotBlank
    private String content;

    @NotBlank
    private String fullName;

    @NotBlank
    @Pattern(regexp = "^(0|\\+84)[0-9]{9}")
    private String phone;

    @NotBlank
    private String email;
    private Date createdDate;
}