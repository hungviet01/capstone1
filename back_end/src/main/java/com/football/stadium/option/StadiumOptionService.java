package com.football.stadium.option;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StadiumOptionService {

    private final StadiumOptionRepository stadiumOptionRepository;
    private final StadiumOptionMapper stadiumOptionMapper;

    public ResultDTO<List<StadiumOptionDto>> findOptionByParentId(String stadiumId) {
        log.info("get stadium-option by stadium-id: {}", stadiumId);
        List<StadiumOption> stadiumOptions = this.stadiumOptionRepository.findByStadiumId(stadiumId);
        return ResultUtils.buildSuccessResult(this.stadiumOptionMapper.toDto(stadiumOptions));
    }
}
