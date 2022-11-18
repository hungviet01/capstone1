package com.football.admin.product;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.product.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/products")
public class AdminProductController {

    private final AdminProductService adminProductService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createProduct(
            @RequestPart ProductDto product,
            @RequestPart(required = false) MultipartFile avatarFile,
            @RequestPart(required = false) List<MultipartFile> images)
    {
        ResultDTO resultDTO = this.adminProductService.saveProduct(product, avatarFile, images);
        return ResponseEntity.ok(resultDTO);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity deleteProduct(@PathVariable String productId) {
        ResultDTO resultDTO = this.adminProductService.deleteProduct(productId);
        return ResponseEntity.ok(resultDTO);
    }
}
