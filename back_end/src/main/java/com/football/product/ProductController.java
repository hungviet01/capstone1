package com.football.product;

import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/search-product")
    public ResponseEntity searchProduct(@RequestBody SearchDTO<ProductDto> searchDTO) {
        SearchResponse<List<ProductDto>> searchResponse = this.productService.searchProduct(searchDTO);
        return ResponseEntity.ok(searchResponse);
    }

    @GetMapping("/{productId}")
    public ResponseEntity findById(@PathVariable String productId) {
        ProductDto product = this.productService.findById(productId);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity findByCategory(@PathVariable Long id) {
        return ResponseEntity.ok(this.productService.findByCategoryId(id));
    }
}
