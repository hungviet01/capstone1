package com.football.cart;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.ResultUtils;
import com.football.user.UserDto;
import com.football.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final UserService userService;

    private final CartMapper cartMapper;

    private Cart validateChangeQuantityCart(Long cartId) {
        Cart cart = this.cartRepository.findById(cartId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy cart"));
        UserDto currentUser = this.userService.getCurrentUser();
        if (!cart.getUsername().equals(currentUser.getUsername())) {
            throw new IllegalArgumentException("Không có quyền thực hiện");
        }
        return cart;
    }

    public SearchResponse<List<CartDto>> getMyCart(SearchDTO<CartDto> searchDTO) {
        CartDto data = searchDTO.getData();
        UserDto currentUser = this.userService.getCurrentUser();
        Page<CartDto> carts = this.cartRepository.searchCart(
                currentUser.getUsername(),
                DataUtils.resolveKeySearch(data.getProductName()),
                data.getCategoryId(),
                PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize())
        );
        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setData(carts.getContent());
        searchResponse.setTotal(carts.getTotalElements());
        return searchResponse;
    }

    public ResultDTO plusQuantity(Long cartId) {
        Cart cart = this.validateChangeQuantityCart(cartId);

        cart.setQuantity(cart.getQuantity() + 1);
        this.cartRepository.save(cart);
        return ResultUtils.buildSuccessResult(cart);
    }

    public ResultDTO subtractQuantity(Long cartId) {
        Cart cart = this.validateChangeQuantityCart(cartId);
        if (cart.getQuantity() == 0) {
            return ResultUtils.buildErrorResult("Không thấy giảm số lượng");
        }
        cart.setQuantity(cart.getQuantity() - 1);
        this.cartRepository.save(cart);
        return ResultUtils.buildSuccessResult(cart);
    }

    public ResultDTO deleteCart(Long cartId) {
        this.validateChangeQuantityCart(cartId);
        this.cartRepository.deleteById(cartId);
        return ResultUtils.buildSuccessResult(null);
    }

    public ResultDTO addToCart(CartDto cartDto) {

        UserDto currentUser = this.userService.getCurrentUser();
        Optional<Cart> cartOpt = this.cartRepository.findByUsernameAndProductIdAndSizeId(
                currentUser.getUsername(),
                cartDto.getProductId(),
                cartDto.getSizeId()
        );
        if (cartOpt.isPresent()) {
            Cart cart = cartOpt.get();
            cart.setQuantity( cart.getQuantity() + cartDto.getQuantity());
            this.cartRepository.save(cart);
            return ResultUtils.buildSuccessResult(cartOpt.get());
        }
        Cart cart = this.cartMapper.toEntity(cartDto);
        cart.setUsername(currentUser.getUsername());
        this.cartRepository.save(cart);
        return ResultUtils.buildSuccessResult(cart);
    }
}
