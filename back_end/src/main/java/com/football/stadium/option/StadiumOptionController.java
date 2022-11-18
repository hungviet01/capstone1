package com.football.stadium.option;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stadium-option")
@RequiredArgsConstructor
public class StadiumOptionController {

    private final StadiumOptionService stadiumOptionService;

    @GetMapping("/{stadiumId}")
    public ResponseEntity findOptionByParentId(@PathVariable String stadiumId) {
        ResultDTO<List<StadiumOptionDto>> result = this.stadiumOptionService.findOptionByParentId(stadiumId);
        return ResponseEntity.ok(result.getData());
    }
}
