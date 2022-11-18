package com.football.admin.user;

import com.football.common.dto.ResultDTO;
import com.football.common.dto.SearchDTO;
import com.football.common.dto.SearchResponse;
import com.football.user.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @PostMapping("/search")
    public ResponseEntity searchUser(@RequestBody SearchDTO<UserDto> searchDTO) {
        SearchResponse<List<UserDto>> listSearchResponse = this.adminUserService.searchUser(searchDTO);
        return ResponseEntity.ok(listSearchResponse);
    }

    @GetMapping("/lock/{username}")
    public ResponseEntity lockUser(@PathVariable String username) {
        ResultDTO resultDTO = this.adminUserService.lockUser(username);
        return ResponseEntity.ok(resultDTO);
    }

    @GetMapping("/unlock/{username}")
    public ResponseEntity unlockUser(@PathVariable String username) {
        ResultDTO resultDTO = this.adminUserService.unlockUser(username);
        return ResponseEntity.ok(resultDTO);
    }
}
