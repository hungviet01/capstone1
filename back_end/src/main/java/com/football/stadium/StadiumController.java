package com.football.stadium;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/stadiums")
@RequiredArgsConstructor
public class StadiumController {

    private final StadiumService stadiumService;

    @PostMapping("/search-stadium")
    public ResponseEntity searchStadium(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        ResultDTO<SearchResponse> result = this.stadiumService.searchStadium(searchDTO);
        return ResponseEntity.status(result.getStatus()).body(result.getData());
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity createStadium(@RequestPart StadiumDto stadiumDto, @RequestPart MultipartFile avatarFile, @RequestPart(required = false) List<MultipartFile> images) {
        stadiumDto.setAvatarFile(avatarFile);
        stadiumDto.setImages(images);
        ResultDTO<StadiumDto> result = this.stadiumService.createStadium(stadiumDto);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @PostMapping("/mine")
    public ResponseEntity getMyStadium(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        ResultDTO myStadium = this.stadiumService.getMyStadium(searchDTO);
        return ResponseEntity.ok(myStadium.getData());
    }

    @GetMapping("/{id}")
    public ResponseEntity getStadiumById(@PathVariable String id) {
        ResultDTO<StadiumDto> result = this.stadiumService.getStadiumById(id);
        return ResponseEntity.ok(result.getData());
    }

    @PostMapping("/available-stadium")
    public ResponseEntity getAvailableStadium(@RequestBody AvailableStadium.Request availableStadium) throws ParseException {
        List<AvailableStadium.Response> availableStadium1 = this.stadiumService.findAvailableStadium(availableStadium);
        return ResponseEntity.ok(availableStadium1);
    }

    @DeleteMapping("/{stadiumId}")
    public ResponseEntity deleteStadium(@PathVariable String stadiumId) {
        ResultDTO resultDTO = this.stadiumService.deleteStadium(stadiumId);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }

    @PostMapping(value = "/{stadiumId}")
    public ResponseEntity updateStadium(
            @PathVariable String stadiumId,
            @RequestPart StadiumDto stadiumDto,
            @RequestPart(required = false) MultipartFile avatarFile,
            @RequestPart(required = false) List<MultipartFile> images) {
        stadiumDto.setId(stadiumId);
        stadiumDto.setAvatarFile(avatarFile);
        stadiumDto.setImages(images);
        ResultDTO resultDTO = this.stadiumService.updateStadium(stadiumDto);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }
}
