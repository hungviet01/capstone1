package com.football.admin.user;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.common.utils.DataUtils;
import com.football.common.utils.ResultUtils;
import com.football.user.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;
    public SearchResponse<List<UserDto>> searchUser(SearchDTO<UserDto> searchDTO) {
        log.info("search user");
        UserDto user = searchDTO.getData();
        Pageable pageable = null;
        if (Objects.nonNull(searchDTO.getPage()) && Objects.nonNull(searchDTO.getPageSize())) {
            pageable = PageRequest.of(searchDTO.getPage() - 1, searchDTO.getPageSize());
        }
        Page<User> users = this.userRepository.searchUser(
                DataUtils.resolveKeySearch(user.getUsername()),
                user.getStatus(),
                user.getRole(),
                pageable
        );
        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setData(this.userMapper.toDto(users.getContent()));
        searchResponse.setTotal(users.getTotalElements());
        return searchResponse;
    }

    public ResultDTO lockUser(String username) {
        log.info("lock user: {}", username);
        return this.changeStatusUser(username, UserConstant.Status.DELETED);
    }

    public ResultDTO unlockUser(String username) {
        log.info("unlock user: {}", username);
        return this.changeStatusUser(username, UserConstant.Status.ACTIVED);
    }

    @Transactional
    public ResultDTO changeStatusUser(String username, Integer status) {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy username"));
        user.setStatus(status);
        this.userRepository.save(user);
        return ResultUtils.buildSuccessResult(user);
    }
}
