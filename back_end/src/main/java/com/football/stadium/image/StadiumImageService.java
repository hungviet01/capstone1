package com.football.stadium.image;

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
public class StadiumImageService {

    private final StadiumImageRepository stadiumImageRepository;
    private final StadiumImageMapper stadiumImageMapper;

    public ResultDTO<List<StadiumImageDto>> findStadiumImageByParentId(String stadiumId) {
        log.info("get stadium-image by stadium-id: {}", stadiumId);
        List<StadiumImage> stadiumImage = this.stadiumImageRepository.findByStadiumId(stadiumId);
        return ResultUtils.buildSuccessResult(this.stadiumImageMapper.toDto(stadiumImage));
    }
}
