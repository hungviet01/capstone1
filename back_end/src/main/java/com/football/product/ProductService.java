package com.football.product;

import com.football.common.constant.StatusEnum;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public SearchResponse<List<ProductDto>> searchProduct(SearchDTO<ProductDto> searchDTO) {
        log.info("search product: {}", searchDTO);
        ProductDto data = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPage()) && Objects.nonNull(searchDTO.getPageSize())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }

        Page<ProductDto> pageProduct = this.productRepository.searchProduct(
                data.getCategoryId(),
                DataUtils.resolveKeySearch(data.getName()),
                StatusEnum.ACTIVE.getStatus(),
                pageable
        );
        SearchResponse<List<ProductDto>> searchResponse = new SearchResponse<>();
        searchResponse.setTotal(pageProduct.getTotalElements());
        searchResponse.setData(pageProduct.getContent());
        return searchResponse;
    }

    public ProductDto findById(String productId) {
        Product product = this.productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Không tim thấy sản phẩm"));
        return this.productMapper.toDto(product);
    }

    public List<ProductDto> findByCategoryId(Long categoryId) {
        List<Product> byCategoryId = this.productRepository.findByCategoryId(categoryId);
        return this.productMapper.toDto(byCategoryId);
    }
}