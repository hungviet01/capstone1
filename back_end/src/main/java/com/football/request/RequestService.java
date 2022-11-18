package com.football.request;

import com.football.common.constant.StatusEnum;
import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.DateUtils;
import com.football.common.utils.ResultUtils;
import com.football.mail.MailDTO;
import com.football.mail.MailService;
import com.football.mail.MailTemplate;
import com.football.stadium.Stadium;
import com.football.stadium.StadiumDto;
import com.football.stadium.StadiumRepository;
import com.football.stadium.type.StadiumType;
import com.football.stadium.type.StadiumTypeRepository;
import com.football.stadium.type.detail.StadiumDetail;
import com.football.stadium.type.detail.StadiumDetailRepository;
import com.football.user.User;
import com.football.user.UserDto;
import com.football.user.UserRepository;
import com.football.user.UserService;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.time.Instant;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class RequestService {

    private final UserService userService;
    private final MailService mailService;

    private final RequestRepository requestRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumRepository stadiumRepository;
    private final StadiumTypeRepository stadiumTypeRepository;
    private final UserRepository userRepository;

    private final RequestMapper requestMapper;

    private final ValidatorService validator;

    @Transactional
    public ResultDTO requestStadium(RequestDto requestDto) {
        log.info("request to book a stadium: {}", requestDto);

        StadiumDetail stadiumDetail = this.stadiumDetailRepository.findById(requestDto.getStadiumDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        Stadium stadium = this.stadiumRepository.findByStadiumDetailId(stadiumDetail.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        if (StatusEnum.INACTIVE.getStatus().equals(stadium.getStatus())) {
            throw new IllegalArgumentException("SVĐ bị đã ngừng kinh doanh");
        }
        StadiumType stadiumType = this.stadiumTypeRepository.findById(stadiumDetail.getParentId()).orElse(new StadiumType());
        List<Request> approvedRequests = this.requestRepository.findApprovedRequest(stadiumDetail.getId(), DateUtils.dateToString(requestDto.getHireDate()), RequestStatus.APPROVED.getStatus());
        if (stadiumType.getQuantity() == approvedRequests.size()) {
            throw new IllegalArgumentException("Thời gian này đã có người đặt trước.");
        }

        UserDto currentUser = this.userService.getCurrentUser();
        Request request = this.requestMapper.toEntity(requestDto);
        request.setCreatedBy(currentUser.getUsername());
        request.setCreatedDate(Instant.now());
        request.setStatus(RequestStatus.PENDING.getStatus());
        request = this.requestRepository.save(request);
        this.sendMailToOwnerStadium(request, stadiumDetail, currentUser);
        log.info("request booking successfully");
        return ResultUtils.buildSuccessResult(request);
    }

    @Async
    public void sendMailToOwnerStadium(Request request, StadiumDetail stadiumDetail, UserDto currentUser) {
        log.info("send mail to owner stadium");
        StadiumType stadiumType = this.stadiumTypeRepository.findById(stadiumDetail.getParentId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        Optional<Stadium> stadiumOpt = this.stadiumRepository.findById(stadiumType.getStadiumId());

        if (!stadiumOpt.isPresent()) return;

        Stadium stadium = stadiumOpt.get();

        User ownerStadium = this.userRepository.findByUsername(stadium.getCreatedBy()).orElse(new User());

        MailDTO mailDTO = new MailDTO();
        mailDTO.setSubject("[THÔNG BÁO] YÊU CẦU ĐĂNG KÝ THUÊ SÂN: " + stadium.getName());
        mailDTO.setTemplateContent(MailTemplate.REQUEST_BOOKING);
        mailDTO.setTo(new String[] {ownerStadium.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());

        Map<String, Object> params = mailDTO.getParamsTemplate();
        params.put("param0", ownerStadium.getFullName());
        params.put("param1", stadium.getName());
        params.put("param2", currentUser.getUsername());
        params.put("param3", stadium.getName());
        params.put("param4", stadiumDetail.getStartTime().toString() + "-" + stadiumDetail.getEndTime().toString() + " " + DateUtils.dateToString(request.getHireDate(), "dd-MM-yyyy"));
        params.put("param5", stadiumDetail.getPrice().toString());
        params.put("param6", currentUser.getUsername());
        params.put("param7", currentUser.getFullName());
        params.put("param8", currentUser.getEmail());
        params.put("param9", currentUser.getPhone());
        params.put("param10", stadiumType.getName());
        this.mailService.send(mailDTO);
    }

    public SearchResponse<List<PendingRequestDto>> getStadiumRequest(SearchDTO<StadiumDto> searchDTO) {
        StadiumDto stadiumDto = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPageSize()) && Objects.nonNull(searchDTO.getPage())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }
        log.info("get request of stadium: {}", stadiumDto);
        Page<PendingRequestDto> pageResponse = this.requestRepository.findStadiumRequest(
                stadiumDto.getId(),
                stadiumDto.getProvinceId(),
                stadiumDto.getDistrictId(),
                DataUtils.resolveKeySearch(stadiumDto.getName()),
                pageable
        );
        SearchResponse<List<PendingRequestDto>> searchResponse = new SearchResponse<>();
        searchResponse.setData(pageResponse.getContent());
        searchResponse.setTotal(pageResponse.getTotalElements());
        return searchResponse;
    }

    @Transactional
    public ResultDTO approveRequest(PendingRequestDto pendingRequestDto) {
        log.info("approve a request: {}", pendingRequestDto);
        this.requestRepository.findById(pendingRequestDto.getRequestId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lời yêu cầu"));

        List<Request> requests = this.requestRepository.findAllByHireDateAndStadiumDetailId(
                DateUtils.dateToString(pendingRequestDto.getHireDate(), "yyyy-MM-dd"),
                pendingRequestDto.getDetailId()
        );

        Stadium stadium = this.stadiumRepository.findByStadiumDetailId(pendingRequestDto.getDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));

        UserDto currentUser = this.userService.getCurrentUser();
        if (!currentUser.getUsername().equals(stadium.getCreatedBy())) {
            throw new HttpClientErrorException(HttpStatus.FORBIDDEN);
        }

        requests.forEach(request -> {
            if (request.getId() == pendingRequestDto.getRequestId()) {
                request.setStatus(RequestStatus.APPROVED.getStatus());
                this.requestRepository.save(request);
                this.mailService.sendMailToRequester(request, stadium, null);
                return;
            }

            request.setStatus(RequestStatus.REJECT.getStatus());
            this.requestRepository.save(request);
            this.mailService.sendMailToRequester(request, stadium, null);
        });

        return ResultUtils.buildSuccessResult(null);
    }

    public ResultDTO<List<RequestTree>> getCompetitor(String stadiumId) {
        log.info("get competitor stadium: {}", stadiumId);
        this.stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        UserDto currentUser = this.userService.getCurrentUser();
        List<RequestTree> trees = this.requestRepository.findRequestTree(stadiumId, currentUser.getUsername());
        trees.forEach(tree -> {
            List<RequestDto> children = this.requestRepository.findAllRequestByHireDate(
                    tree.getHireDate(),
                    tree.getTypeId()
            );
            tree.setChildren(children);
        });
        return ResultUtils.buildSuccessResult(trees);
    }

    public ResultDTO rejectRequest(PendingRequestDto pendingRequestDto) {
        log.info("reject a request: {}", pendingRequestDto);
        Request request = this.requestRepository.findById(pendingRequestDto.getRequestId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy lời yêu cầu"));

        Stadium stadium = this.stadiumRepository.findByStadiumDetailId(pendingRequestDto.getDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy SVĐ"));
        UserDto currentUser = this.userService.getCurrentUser();
        if (!currentUser.getUsername().equals(stadium.getCreatedBy())) {
            throw new HttpClientErrorException(HttpStatus.FORBIDDEN);
        }
        request.setStatus(RequestStatus.REJECT.getStatus());
        this.requestRepository.save(request);
        this.mailService.sendMailToRequester(request, stadium, null);
        return ResultUtils.buildSuccessResult(null);
    }

    public ResultDTO<SearchResponse<List<RequestDto>>> getFindingRequest(SearchDTO<StadiumDto> searchDTO) {
        log.info("request to get finding-request");
        return this.getRequestByUsername(searchDTO, true);
    }

    public ResultDTO<SearchResponse<List<RequestDto>>> getRequestByUsername(SearchDTO<StadiumDto> searchDTO, boolean isFinding) {
        Pageable pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        StadiumDto data = searchDTO.getData();
        UserDto currentUser = this.userService.getCurrentUser();
        Page<RequestDto> response = this.requestRepository.findRequestByUsername(
                currentUser.getUsername(),
                isFinding,
                data.getProvinceId(),
                data.getDistrictId(),
                DataUtils.resolveKeySearch(data.getName()),
                pageable
        );
        SearchResponse<List<RequestDto>> searchResponse = new SearchResponse<>();
        searchResponse.setTotal(response.getTotalElements());
        searchResponse.setData(response.getContent());
        return ResultUtils.buildSuccessResult(searchResponse);
    }
}
