package com.football.size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link Size} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeDto implements Serializable {
    private Long id;
    private String name;
    private String productId;
}