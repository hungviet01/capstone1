package com.football.feedback;

import com.football.feedback.Feedback;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.ResultUtils;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final ValidatorService validatorService;

    private final FeedbackMapper feedbackMapper;


    public SearchResponse<List<FeedbackDto>> searchFeedback(SearchDTO<FeedbackDto> searchDTO) {
        FeedbackDto data = searchDTO.getData();
        Page<Feedback> feedbacks = this.feedbackRepository.searchFeedback(
                DataUtils.resolveKeySearch(data.getFullName()),
                data.getCreatedDate(),
                PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize())
        );

        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setData(feedbacks.getContent());
        searchResponse.setTotal(feedbacks.getTotalElements());
        return searchResponse;
    }

    public ResultDTO sendFeedback(FeedbackDto feedbackDto) {
        this.validatorService.validate(feedbackDto);
        Feedback feedback = this.feedbackMapper.toEntity(feedbackDto);
        feedback.setCreatedDate(new Date());
        this.feedbackRepository.save(feedback);
        return ResultUtils.buildSuccessResult(null);
    }
}
