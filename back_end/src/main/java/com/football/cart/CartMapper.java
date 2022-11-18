package com.football.cart;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class CartMapper extends Mapper<Cart, CartDto> {

    public CartMapper() {
        super(Cart.class, CartDto.class);
    }
}
