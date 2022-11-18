package com.football.size;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sizes")
@RequiredArgsConstructor
public class SizeController {

    private final SizeRepository sizeRepository;

    @GetMapping("/product/{productId}")
    public ResponseEntity findByProductId(@PathVariable String productId) {
        return ResponseEntity.ok(this.sizeRepository.findByProductId(productId));
    }
}
