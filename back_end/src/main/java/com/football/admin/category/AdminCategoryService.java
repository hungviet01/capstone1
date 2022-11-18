package com.football.admin.category;

import com.football.category.Category;
import com.football.category.CategoryDto;
import com.football.category.CategoryMapper;
import com.football.category.CategoryRepository;
import com.football.common.constant.StatusEnum;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.ResultUtils;
import com.football.product.Product;
import com.football.product.ProductRepository;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminCategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    private final CategoryMapper categoryMapper;

    private final ValidatorService validatorService;

    public SearchResponse<List<CategoryDto>> searchCategory(SearchDTO<CategoryDto> searchDTO) {
        CategoryDto data = searchDTO.getData();
        Page<Category> categories = this.categoryRepository.searchCategory(data.getName(), PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize()));
        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setTotal(categories.getTotalElements());
        searchResponse.setData(categories.getContent());
        return searchResponse;
    }

    @Transactional
    public ResultDTO saveCategory(CategoryDto categoryDto) {
        log.info("save category");
        this.validatorService.validate(categoryDto);
        Category category = this.categoryMapper.toEntity(categoryDto);
        this.categoryRepository.save(category);
        return ResultUtils.buildSuccessResult(category);
    }

    @Transactional
    public ResultDTO deleteCategory(Long categoryId) {
        log.info("delete category: {}", categoryId);
        Category category = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy loại sản phẩm"));

        List<Product> products = this.productRepository.findByCategoryId(categoryId);
        if (!CollectionUtils.isEmpty(products)) {
            throw new IllegalArgumentException("Loại sản phẩm đã tồn tại sản phẩm. Không thể xóa");
        }
        this.categoryRepository.deleteById(categoryId);
        return ResultUtils.buildSuccessResult(categoryId);
    }
}
