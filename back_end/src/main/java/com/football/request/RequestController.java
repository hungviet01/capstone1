package com.football.request;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.stadium.StadiumDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/search-request")
    public ResponseEntity getStadiumRequest(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        return ResponseEntity.ok(this.requestService.getStadiumRequest(searchDTO));
    }

    @PostMapping
    public ResponseEntity requestStadium(@RequestBody RequestDto requestDto) {
        ResultDTO resultDTO = this.requestService.requestStadium(requestDto);
        return ResponseEntity.ok(resultDTO.getData());
    }

    @PostMapping("/approve")
    public ResponseEntity approveRequest(@RequestBody PendingRequestDto pendingRequestDto) {
        ResultDTO resultDTO = this.requestService.approveRequest(pendingRequestDto);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }

    @PostMapping("/reject")
    public ResponseEntity rejectRequest(@RequestBody PendingRequestDto pendingRequestDto) {
        ResultDTO result = this.requestService.rejectRequest(pendingRequestDto);
        return ResponseEntity.status(result.getStatus()).body(result);
    }

    @GetMapping("/competitor/{stadiumId}")
    public ResponseEntity getCompetitor(@PathVariable String stadiumId) {
        ResultDTO result = this.requestService.getCompetitor(stadiumId);
        return ResponseEntity.ok(result.getData());
    }

    @PostMapping("/finding-request")
    public ResponseEntity getFindingRequest(@RequestBody SearchDTO<StadiumDto> searchDTO) {
        ResultDTO<SearchResponse<List<RequestDto>>> result = this.requestService.getFindingRequest(searchDTO);
        return ResponseEntity.ok(result.getData());
    }
}
