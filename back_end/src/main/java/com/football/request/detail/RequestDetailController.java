package com.football.request.detail;

import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/requests")
@RequiredArgsConstructor
public class RequestDetailController {

    private final RequestDetailService requestDetailService;

    @GetMapping("/challenge-request/{parentId}")
    public ResponseEntity getAllChallengeRequest(@PathVariable Long parentId) {
        List<RequestDetailDto> byParentId = this.requestDetailService.findByParentId(parentId);
        return ResponseEntity.ok(byParentId);
    }

    @GetMapping("/reject-competitor-request/{requestDetailId}")
    public ResponseEntity rejectCompetitorRequest(@PathVariable Long requestDetailId) {
        ResultDTO resultDTO = this.requestDetailService.rejectCompetitorRequest(requestDetailId);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }

    @GetMapping("/approve-competitor-request/{requestDetailId}")
    public ResponseEntity approveCompetitorRequest(@PathVariable Long requestDetailId) {
        ResultDTO resultDTO = this.requestDetailService.approveCompetitorRequest(requestDetailId);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }

    @PostMapping("/create-challenge-request")
    public ResponseEntity createPendingRequest(@RequestBody RequestDetailDto requestDetailDto) {
        ResultDTO resultDTO = this.requestDetailService.createChallengeRequest(requestDetailDto);
        return ResponseEntity.status(resultDTO.getStatus()).body(resultDTO);
    }
}
