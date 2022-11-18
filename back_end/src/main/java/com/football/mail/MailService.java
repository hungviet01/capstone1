package com.football.mail;

import com.football.request.Request;
import com.football.request.RequestStatus;
import com.football.stadium.Stadium;
import com.football.user.User;
import com.football.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    private final UserRepository userRepository;

    @Async
    public void sendMailToRequester(Request request, Stadium stadium, String reason) {
        log.info("send mail to requester: {}", request.getCreatedBy());

        User user = this.userRepository.findByUsername(request.getCreatedBy())
                .orElse(new User());

        MailDTO mailDTO = new MailDTO();
        mailDTO.setTo(new String[] {user.getEmail()});
        mailDTO.setParamsTemplate(new HashMap<>());

        Map<String, Object> param = mailDTO.getParamsTemplate();
        param.put("param0", user.getFullName());
        param.put("param1", stadium.getName());
        param.put("param2", reason);
        if (RequestStatus.APPROVED.getStatus().equals(request.getStatus())) {
            mailDTO.setTemplateContent(MailTemplate.APPROVE_REQUEST);
            mailDTO.setSubject("[CHÚC MỪNG] CHẤP NHẬN YÊU CẦU ĐẶT SÂN");
        }

        if (RequestStatus.REJECT.getStatus().equals(request.getStatus())) {
            mailDTO.setTemplateContent(MailTemplate.REJECT_REQUEST);
            mailDTO.setSubject("[THÔNG BÁO] TỪ CHỐI YÊU CẦU ĐẶT SÂN");
        }
        this.send(mailDTO);
    }

    public void send(MailDTO mailDTO) {
        try {
            log.info("start to send mail");
            MimeMessage mimeMessage = this.mailSender.createMimeMessage();

            Context context = new Context(LocaleContextHolder.getLocale(), mailDTO.getParamsTemplate());
            String content = this.templateEngine.process(mailDTO.getTemplateContent().getTemplate(), context);
            mimeMessage.setText(content, "UTF-8", MailConstant.TYPE_HTML);
            mimeMessage.setSubject(mailDTO.getSubject());
            mimeMessage.setFrom(MailConstant.SENDER_ADDRESS);

            if (Objects.nonNull(mailDTO.getTo())) {
                for (String to : mailDTO.getTo()) {
                    mimeMessage.addRecipients(Message.RecipientType.TO, to);
                }
            }

            this.mailSender.send(mimeMessage);
            log.info("finished");
        } catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
    }
}