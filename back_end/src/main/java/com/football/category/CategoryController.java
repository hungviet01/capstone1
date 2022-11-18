package com.football.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity getAllCategory() {
        return ResponseEntity.ok(this.categoryService.getAllCategory());
    }

    @GetMapping("/products")
    public ResponseEntity getCategoryAndProduct() {
        List<CategoryDto> allCategoryAndProduct = this.categoryService.getAllCategoryAndProduct();
        return ResponseEntity.ok(allCategoryAndProduct);
    }
}
