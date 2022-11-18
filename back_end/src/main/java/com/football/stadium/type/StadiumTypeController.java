package com.football.stadium.type;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stadium-detail")
@RequiredArgsConstructor
public class StadiumTypeController {

    private final StadiumTypeService stadiumTypeService;

    @GetMapping("/{stadiumId}")
    public ResponseEntity getStadiumDetailByParentId(@PathVariable String stadiumId) {
        ResultDTO<List<StadiumTypeTree>> result = this.stadiumTypeService.findStadiumDetailByParentId(stadiumId);
        return ResponseEntity.ok(result.getData());
    }

}
