package com.football.mail;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MailTemplate {

    REGIS_USER("regis-user"),
    RE_GET_OTP("re-get-otp"),
    REQUEST_BOOKING("request-booking"),
    APPROVE_REQUEST("approve-request"),
    REJECT_REQUEST("reject-request"),
    REJECT_COMPETITOR("reject-competitor"),
    APPROVE_COMPETITOR("approve-competitor"),
    CHALLENGE_REQUEST("challenge-request"),
    REJECT_BILL("reject-bill"),
    APPROVE_BILL("approve-bill");

    String template;
}
