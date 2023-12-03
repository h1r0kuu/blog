package com.pwgp.blog.dto.email;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class EmailRequest {
    private String to;
    private String subject;
    private String template;
    private Map<String, Object> variables;
}
