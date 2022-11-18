package com.football.admin.category;

import com.football.category.CategoryDto;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/categories")
public class AdminCategoryController {

    private final AdminCategoryService adminCategoryService;

    @PostMapping("/search-category")
    public ResponseEntity searchCategory(@RequestBody SearchDTO<CategoryDto> searchDTO) {
        SearchResponse<List<CategoryDto>> listSearchResponse = this.adminCategoryService.searchCategory(searchDTO);
        return ResponseEntity.ok(listSearchResponse);
    }

    @PostMapping
    public ResponseEntity saveCategory(@RequestBody CategoryDto categoryDto) {
        ResultDTO resultDTO = this.adminCategoryService.saveCategory(categoryDto);
        return ResponseEntity.ok(resultDTO);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity deleteCategory(@PathVariable Long categoryId) {
        ResultDTO resultDTO = this.adminCategoryService.deleteCategory(categoryId);
        return ResponseEntity.ok(resultDTO);
    }
}
