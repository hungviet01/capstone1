package com.football.product.image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * A DTO for the {@link ProductImage} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageDto implements Serializable {
    private Long id;
    private String url;
    private String productId;
}