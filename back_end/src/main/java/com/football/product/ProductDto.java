package com.football.product;

import com.football.category.Category;
import com.football.product.image.ProductImage;
import com.football.product.image.ProductImageDto;
import com.football.size.SizeDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * A DTO for the {@link Product} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto implements Serializable {
    private String id;
    private String name;
    private Long categoryId;
    private String categoryName;
    private Long quantity;
    private BigDecimal price;
    private Date createdDate;
    private Integer status;
    private String avatar;
    private String description;
    private BigDecimal fromPrice;
    private BigDecimal toPrice;
    private List<SizeDto> sizes = new ArrayList<>();
    private List<ProductImageDto> images = new ArrayList<>();

    public ProductDto(Product product, Category category) {
        this.id = product.getId();
        this.name = product.getName();
        this.categoryId = product.getCategoryId();
        this.quantity = product.getQuantity();
        this.price = product.getPrice();
        this.createdDate = product.getCreatedDate();
        this.status = product.getStatus();
        this.avatar = product.getAvatar();
        this.description = product.getDescription();
        this.categoryName = category.getName();
    }
}