package com.football.cart;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.product.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CardController {

    private final CartService cartService;

    @PostMapping("/mine")
    public ResponseEntity getMyCart(@RequestBody SearchDTO<CartDto> searchDTO) {
        SearchResponse<List<CartDto>> myCart = this.cartService.getMyCart(searchDTO);
        return ResponseEntity.ok(myCart);
    }

    @PostMapping("/add-to-cart")
    public ResponseEntity addToCart(@RequestBody CartDto cartDto) {
        ResultDTO result = this.cartService.addToCart(cartDto);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/plus/{cartId}")
    public ResponseEntity plusQuantity(@PathVariable Long cartId) {
        ResultDTO resultDTO = this.cartService.plusQuantity(cartId);
        return ResponseEntity.ok(resultDTO);
    }

    @GetMapping("/subtract/{cartId}")
    public ResponseEntity subtractQuantity(@PathVariable Long cartId) {
        ResultDTO resultDTO = this.cartService.subtractQuantity(cartId);
        return ResponseEntity.ok(resultDTO);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity deleteCart(@PathVariable Long cartId) {
        ResultDTO resultDTO = this.cartService.deleteCart(cartId);
        return ResponseEntity.ok(resultDTO);
    }
}