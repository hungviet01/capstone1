package com.football.mail;

import lombok.Data;

import java.util.Map;

@Data
public class MailDTO {

    private String subject;
    private MailTemplate templateContent;
    private String[] to;
    private String[] cc;
    private Map<String, Object> paramsTemplate;

}
