package com.football.product.image;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ProductImageMapper extends Mapper<ProductImage, ProductImageDto> {

    public ProductImageMapper() {
        super(ProductImage.class, ProductImageDto.class);
    }
}
