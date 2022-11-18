package com.football.stadium.type;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import com.football.stadium.type.detail.StadiumDetail;
import com.football.stadium.type.detail.StadiumDetailDto;
import com.football.stadium.type.detail.StadiumDetailMapper;
import com.football.stadium.type.detail.StadiumDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class StadiumTypeService {

    private final StadiumTypeRepository stadiumTypeRepository;
    private final StadiumDetailRepository stadiumDetailRepository;
    private final StadiumDetailMapper stadiumDetailMapper;

    public ResultDTO<List<StadiumTypeTree>> findStadiumDetailByParentId(String stadiumId) {
        List<StadiumType> stadiumDetails = this.stadiumTypeRepository.findByStadiumId(stadiumId);
        Function<StadiumType, StadiumTypeTree> toTree = stadiumType -> {
            StadiumTypeTree stadiumTypeTree = new StadiumTypeTree();
            stadiumTypeTree.setId(stadiumType.getId());
            stadiumTypeTree.setKey(stadiumType.getId().toString());
            stadiumTypeTree.setName(stadiumType.getName());
            stadiumTypeTree.setQuantity(stadiumType.getQuantity());
            List<StadiumDetail> types = this.stadiumDetailRepository.findByParentId(stadiumType.getId());
            List<StadiumDetailDto> details = this.stadiumDetailMapper.toDto(types);
            stadiumTypeTree.setChildren(details);
            return stadiumTypeTree;
        };
        List<StadiumTypeTree> trees = stadiumDetails.stream().map(toTree).collect(Collectors.toList());
        return ResultUtils.buildSuccessResult(trees);
    }
}
