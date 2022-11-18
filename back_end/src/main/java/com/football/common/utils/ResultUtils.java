package com.football.common.utils;

import com.football.common.dto.ResultDTO;
import org.springframework.http.HttpStatus;

public class ResultUtils {

    public static ResultDTO<String> buildErrorResult(String message) {
        ResultDTO<String> result = new ResultDTO<>();
        result.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        result.setMessage(message);
        return result;
    }

    public static ResultDTO<String> buildErrorValidateResult(String message) {
        ResultDTO<String> result = new ResultDTO<>();
        result.setStatus(HttpStatus.BAD_REQUEST);
        result.setMessage(message);
        return result;
    }

    public static <T> ResultDTO<T> buildSuccessResult(T data) {
        ResultDTO<T> result = new ResultDTO<>();
        result.setData(data);
        result.setStatus(HttpStatus.OK);
        result.setMessage("Thành công");
        return result;
    }
}
