package com.football.admin.feedback;

import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.feedback.FeedbackDto;
import com.football.feedback.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/feedbacks")
@RequiredArgsConstructor
public class AdminFeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping("/search-feedback")
    public ResponseEntity searchFeedback(@RequestBody SearchDTO<FeedbackDto> searchDTO) {
        SearchResponse<List<FeedbackDto>> listSearchResponse = this.feedbackService.searchFeedback(searchDTO);
        return ResponseEntity.ok(listSearchResponse);
    }
}
