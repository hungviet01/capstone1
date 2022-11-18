package com.football.user;

import com.football.common.dto.ResultDTO;
import com.football.common.utils.ResultUtils;
import com.football.mail.MailDTO;
import com.football.mail.MailService;
import com.football.mail.MailTemplate;
import com.football.role.RoleEnum;
import com.football.validator.ValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final MailService mailService;
    private final UserMapper userMapper;

    private final ValidatorService validatorService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.football.user.User user = this.getUserByUsername(username);
        return User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .authorities(user.getRole())
                .accountLocked(user.getStatus() == UserConstant.Status.WAIT)
                .accountExpired(user.getStatus() == UserConstant.Status.DELETED)
                .build();
    }

    public UserDto getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User principal = (User) authentication.getPrincipal();
            com.football.user.User user = this.getUserByUsername(principal.getUsername());
            return this.userMapper.toDto(user);
        } catch (Exception exception) {
            return new UserDto();
        }
    }

    public com.football.user.User getUserByUsername(String username) {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("not found username: " + username));
    }

    @Transactional
    public ResultDTO<UserDto> regisUser(com.football.user.User user) {
        this.validatorService.validate(user);
        log.info("regis user: {}", user.getUsername());

        log.info("validate username");
        this.userRepository.findByUsername(user.getUsername())
                .ifPresent(u -> {throw new IllegalArgumentException("Username đã tồn tại");});

        log.info("validate email");
        this.userRepository.findByEmail(user.getEmail())
                .ifPresent(u -> { throw new IllegalArgumentException("Email đã tồn tại");});

        log.info("validate phone");
        this.userRepository.findByPhone(user.getPhone())
                .ifPresent(u -> { throw new IllegalArgumentException("SĐT đã tồn tại");});

        user.setId(UUID.randomUUID().toString());
        user.setStatus(UserConstant.Status.WAIT);
        user.setOtpCode(UserUtils.generateOtp());
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        if (StringUtils.isBlank(user.getRole())) {
            user.setRole(RoleEnum.USER.name());
        }

        String role = RoleEnum.fromName(user.getRole());
        if (RoleEnum.ADMIN.name().equals(user.getRole())) {
            throw new IllegalArgumentException("Bạn không có quyền thực hiện");
        }
        this.userRepository.save(user);
        this.sendMail(user);
        return ResultUtils.buildSuccessResult(this.userMapper.toDto(user));
    }

    private void sendMail(com.football.user.User user) {
        Map<String, Object> params = new HashMap<>();
        params.put("param0", user.getUsername());
        params.put("param1", user.getOtpCode());
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTemplateContent(MailTemplate.REGIS_USER);
        mailDTO.setParamsTemplate(params);
        mailDTO.setTo(new String[]{user.getEmail()});
        mailDTO.setSubject("[THÔNG BÁO] ĐĂNG KÝ TÀI KHOẢN");
        this.mailService.send(mailDTO);
    }

    @Transactional
    public UserDto activeAccount(UserDto userDto) {
        com.football.user.User user = this.getUserByUsername(userDto.getUsername());
        if (UserConstant.Status.WAIT != user.getStatus()) {
            throw new IllegalArgumentException("Tài khoản đã kích hoạt");
        }

        if (!user.getOtpCode().equals(userDto.getOtpCode())) {
            throw new IllegalArgumentException("OTP không chính xác. Vui lòng kiểm tra email.");
        }
        user.setStatus(UserConstant.Status.ACTIVED);
        user.setOtpCode(null);
        user = this.userRepository.save(user);
        return this.userMapper.toDto(user);
    }

    @Transactional
    public UserDto reSendMail(UserDto userDto) {
        if (StringUtils.isBlank(userDto.getUsername())) {
            throw new IllegalArgumentException("Thông tin không hợp lệ");
        }

        com.football.user.User user = this.getUserByUsername(userDto.getUsername());
        String otp = UserUtils.generateOtp();
        user.setOtpCode(otp);
        Map<String, Object> params = new HashMap<>();
        params.put("param0", user.getUsername());
        params.put("param1", user.getOtpCode());
        MailDTO mailDTO = new MailDTO();
        mailDTO.setTemplateContent(MailTemplate.RE_GET_OTP);
        mailDTO.setParamsTemplate(params);
        mailDTO.setTo(new String[]{user.getEmail()});
        mailDTO.setSubject("RE-[THÔNG BÁO] CẤP LẠI MÃ KÍCH HOẠT THẺ");
        this.mailService.send(mailDTO);
        user = this.userRepository.save(user);
        return this.userMapper.toDto(user);
    }
}