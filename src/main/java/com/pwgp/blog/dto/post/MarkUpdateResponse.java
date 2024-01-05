package com.pwgp.blog.dto.post;

import lombok.Data;

@Data
public class MarkUpdateResponse {

    private int positiveMarks;
    private int negativeMarks;
    private Boolean markStatus;

}
