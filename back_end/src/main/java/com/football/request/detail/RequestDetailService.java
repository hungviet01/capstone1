package com.football.request.detail;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import com.football.mail.MailDTO;
import com.football.mail.MailService;
import com.football.mail.MailTemplate;
import com.football.request.Request;
import com.football.request.RequestRepository;
import com.football.user.User;
import com.football.user.UserDto;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class RequestDetailService {

    private final RequestDetailRepository requestDetailRepository;
    private final RequestRepository requestRepository;
    private final MailService mailService;
    private final UserService userService;
    private final ValidatorService validator;
    private final RequestDetailMapper requestDetailMapper;

    private RequestDetail validateExistRequestDetail(Long requestDetailId) {
        log.info("validate exist request-detail: {}", requestDetailId);
        return this.requestDetailRepository.findById(requestDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy yêu cầu của đối thủ"));
    }

    public List<RequestDetailDto> findByParentId(Long parentId) {
        log.info("get all request-detail by parent-id: {}", parentId);
        return this.requestDetailMapper.toDto(this.requestDetailRepository.findByParentId(parentId));
    }

    @Transactional
    public ResultDTO approveCompetitorRequest(Long requestDetailId) {
        log.info("approve a competitor request: {}", requestDetailId);
        RequestDetail requestDetail = this.validateExistRequestDetail(requestDetailId);
        requestDetail.setStatus(RequestDetailStatus.APPROVE.getStatus());
        this.requestDetailRepository.save(requestDetail);

        Request request = this.requestRepository.findById(requestDetail.getParentId()).get();
        request.setCompetitorId(requestDetail.getRequester());
        this.requestRepository.save(request);

        User user = this.userService.getUserByUsername(requestDetail.getRequester());
        UserDto currentUser = this.userService.getCurrentUser();
        this.sendApprovedMailToCompetitor(user, currentUser);
        this.requestDetailRepository.findByParentId(requestDetail.getParentId())
                .stream()
                .filter(rd -> !rd.getId().equals(requestDetailId))
                .forEach(rd -> this.rejectCompetitorRequest(rd, currentUser));

        return ResultUtils.buildSuccessResult(requestDetail);
    }

    @Transactional
    public ResultDTO rejectCompetitorRequest(Long requestDetailId) {
        log.info("reject a competitor request: {}", requestDetailId);
        RequestDetail requestDetail = this.validateExistRequestDetail(requestDetailId);
        return rejectCompetitorRequest(requestDetail, this.userService.getCurrentUser());
    }

    private ResultDTO rejectCompetitorRequest(RequestDetail requestDetail, UserDto sessionUser) {
        requestDetail.setStatus(RequestDetailStatus.REJECT.getStatus());
        this.requestDetailRepository.save(requestDetail);
        User user = this.userService.getUserByUsername(requestDetail.getRequester());
        this.sendRejectedMailtoCompetitor(user, sessionUser);
        return ResultUtils.buildSuccessResult(requestDetail);
    }

    @Async
    public void sendApprovedMailToCompetitor(User competitor, UserDto sessionUser) {
        log.info("send approved mail to competitor");
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTemplateContent(MailTemplate.APPROVE_COMPETITOR);
        mailDTO.setTo(new String[] {competitor.getEmail()});
        mailDTO.setSubject("[THÔNG BÁO] CHẤP NHẬN LỜI THÁCH ĐẤU");
        mailDTO.setParamsTemplate(new HashMap<>());
        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", competitor.getFullName());
        params.put("param1", sessionUser.getUsername());
        this.mailService.send(mailDTO);
    }

    @Async
    public void sendRejectedMailtoCompetitor(User competitor, UserDto sessionUser) {
        log.info("send rejected mail to competitor");
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTemplateContent(MailTemplate.REJECT_COMPETITOR);
        mailDTO.setTo(new String[] {competitor.getEmail()});
        mailDTO.setSubject("[THÔNG BÁO] TỪ CHỐI LỜI THÁCH ĐẤU");
        mailDTO.setParamsTemplate(new HashMap<>());
        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", competitor.getFullName());
        params.put("param1", sessionUser.getUsername());
        this.mailService.send(mailDTO);
    }

    public ResultDTO createChallengeRequest(RequestDetailDto requestDetailDto) {
        log.info("create challenge request: {}", requestDetailDto);

        Request request = this.requestRepository.findById(requestDetailDto.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy yêu cầu"));
        User user = this.userService.getUserByUsername(request.getCreatedBy());
        UserDto currentUser = this.userService.getCurrentUser();
        this.validator.validate(requestDetailDto);
        RequestDetail requestDetail = this.requestDetailMapper.toEntity(requestDetailDto);
        requestDetail.setStatus(RequestDetailStatus.PENDING.getStatus());
        requestDetail.setCreatedDate(new Date());
        requestDetail.setRequester(currentUser.getUsername());
        this.requestDetailRepository.save(requestDetail);
        this.sendMailToRequester(user, currentUser);
        return ResultUtils.buildSuccessResult(requestDetail);
    }

    @Async
    public void sendMailToRequester(User user, UserDto sessionUser) {
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTemplateContent(MailTemplate.CHALLENGE_REQUEST);
        mailDTO.setTo(new String[]{user.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());
        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", user.getFullName());
        params.put("param1", sessionUser.getUsername());
        this.mailService.send(mailDTO);
    }
}
