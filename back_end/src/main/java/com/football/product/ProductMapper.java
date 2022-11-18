package com.football.product;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper extends Mapper<Product, ProductDto> {

    public ProductMapper() {
        super(Product.class, ProductDto.class);
    }
}
