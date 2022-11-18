package com.football.stadium.image;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stadium-image")
@RequiredArgsConstructor
public class StadiumImageController {

    private final StadiumImageService stadiumImageService;

    @GetMapping("/{stadiumId}")
    public ResponseEntity getStadiumImageByParentId(@PathVariable String stadiumId) {
        ResultDTO<List<StadiumImageDto>> result = this.stadiumImageService.findStadiumImageByParentId(stadiumId);
        return ResponseEntity.ok(result.getData());
    }
}
