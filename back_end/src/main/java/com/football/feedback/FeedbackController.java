package com.football.feedback;

import com.football.feedback.Feedback;
import com.football.common.dto.ResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity sendFeedback(@RequestBody FeedbackDto feedbackDto) {
        ResultDTO resultDTO = this.feedbackService.sendFeedback(feedbackDto);
        return ResponseEntity.ok(resultDTO);
    }
}
