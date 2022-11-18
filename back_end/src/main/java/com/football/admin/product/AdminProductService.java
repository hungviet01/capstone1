package com.football.admin.product;

import com.football.common.constant.StatusEnum;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.ResultUtils;
import com.football.image.ImageService;
import com.football.product.Product;
import com.football.product.ProductDto;
import com.football.product.ProductMapper;
import com.football.product.ProductRepository;
import com.football.product.image.ProductImage;
import com.football.product.image.ProductImageMapper;
import com.football.product.image.ProductImageRepository;
import com.football.size.Size;
import com.football.size.SizeDto;
import com.football.size.SizeMapper;
import com.football.size.SizeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminProductService {

    private final ImageService imageService;

    private final ProductRepository productRepository;
    private final SizeRepository sizeRepository;
    private final ProductImageRepository productImageRepository;

    private final ProductMapper productMapper;
    private final SizeMapper sizeMapper;
    private final ProductImageMapper productImageMapper;

    private Product validateExistProduct(String productId) {
        return this.productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm"));
    }

    @Transactional
    public ResultDTO saveProduct(ProductDto productDto, MultipartFile avatarFile, List<MultipartFile> images) {
        log.info("save product");
        if (Objects.nonNull(avatarFile)) {
            String avatarUrl = this.imageService.uploadImage(avatarFile);
            productDto.setAvatar(avatarUrl);
        }
        Product product = this.productMapper.toEntity(productDto);
        if (Objects.isNull(product.getId())) {
            product.setId(UUID.randomUUID().toString());
        }
        product.setStatus(StatusEnum.ACTIVE.getStatus());
        product.setCreatedDate(new Date());
        this.productRepository.save(product);

        this.sizeRepository.deleteByProductId(product.getId());
        List<SizeDto> sizes = productDto.getSizes();
        if (!CollectionUtils.isEmpty(sizes)) {
            List<Size> sizeCollection = sizes.stream()
                    .map(this.sizeMapper::toEntity)
                    .map(entity -> {
                        entity.setProductId(product.getId());
                        return entity;
                    }).collect(Collectors.toList());
            this.sizeRepository.saveAll(sizeCollection);
        }
        this.productImageRepository.deleteByProductId(product.getId());

        if (!CollectionUtils.isEmpty(productDto.getImages())) {
            List<ProductImage> productImages = productDto.getImages().stream().map(image -> {
                ProductImage productImage = this.productImageMapper.toEntity(image);
                productImage.setProductId(product.getId());
                return productImage;
            }).collect(Collectors.toList());
            this.productImageRepository.saveAll(productImages);
        }
        if (!CollectionUtils.isEmpty(images)) {
            List<ProductImage> productImages = images.stream()
                    .map(this.imageService::uploadImage)
                    .map(ProductImage::new)
                    .map(pi -> { pi.setProductId(product.getId()); return pi;})
                    .collect(Collectors.toList());
            this.productImageRepository.saveAll(productImages);
        }
        return ResultUtils.buildSuccessResult(product);
    }

    @Transactional
    public ResultDTO deleteProduct(String productId) {
        log.info("delete product: {}", productId);
        Product product = this.validateExistProduct(productId);
        product.setStatus(StatusEnum.INACTIVE.getStatus());
        this.productRepository.save(product);
        return ResultUtils.buildSuccessResult(product);
    }
}
