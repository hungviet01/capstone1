package com.football.category;

import com.football.common.mapper.Mapper;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper extends Mapper<Category, CategoryDto> {

    public CategoryMapper() {
        super(Category.class, CategoryDto.class);
    }
}
