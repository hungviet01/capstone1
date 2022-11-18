package com.football.cart;

import com.football.category.Category;
import com.football.product.Product;
import com.football.product.ProductDto;
import com.football.size.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link Cart} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDto implements Serializable {
    private Long id;
    private String productId;
    private String username;
    private Long quantity;
    private Long categoryId;
    private String categoryName;
    private String productName;
    private String avatarProduct;
    private Long sizeId;
    private ProductDto product;
    private String sizeName;
    private BigDecimal price;
    public CartDto(Cart cart, Product product, Category category, Size size) {
        this.id = cart.getId();
        this.productId = cart.getProductId();
        this.username = cart.getUsername();
        this.quantity = cart.getQuantity();
        this.productName = product.getName();
        this.categoryId = product.getCategoryId();
        this.sizeId = cart.getSizeId();
        this.avatarProduct = product.getAvatar();
        this.categoryName = category.getName();
        this.sizeName = size.getName();
        this.price = product.getPrice();
    }

    public BigDecimal getTotal() {
        if (Objects.isNull(this.price)) return null;
        return this.price.multiply(new BigDecimal(this.quantity));
    }
}