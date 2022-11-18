package com.football.category;

import com.football.common.dto.SearchResponse;
import com.football.product.ProductDto;
import com.football.product.ProductMapper;
import com.football.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    private final CategoryMapper categoryMapper;
    private final ProductMapper productMapper;

    public List<CategoryDto> getAllCategory() {
        return this.categoryMapper.toDto(this.categoryRepository.findAll());
    }

    public List<CategoryDto> getAllCategoryAndProduct() {
        return this.getAllCategory()
                .stream()
                .map(categoryDto -> {
                    List<ProductDto> productDtos = this.productMapper.toDto(this.productRepository.findByCategoryId(categoryDto.getId()));
                    categoryDto.setProducts(productDtos);
                    return categoryDto;
                }).collect(Collectors.toList());
    }
}
