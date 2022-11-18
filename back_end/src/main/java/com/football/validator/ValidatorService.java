package com.football.validator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.DirectFieldBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;

import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class ValidatorService {

    private final SmartValidator validator;

    public <T> void validate(T target) {
        log.info("validate object: {}", target);
        if (Objects.isNull(target)) {
            throw new IllegalArgumentException("target cannot be not null");
        }
        DirectFieldBindingResult directFieldBindingResult = new DirectFieldBindingResult(target, target.getClass().getSimpleName());
        this.validator.validate(target, directFieldBindingResult);
        if (directFieldBindingResult.hasErrors()) {
            FieldError fieldError = directFieldBindingResult.getFieldError();
            throw new IllegalArgumentException(fieldError.getField() + " " + fieldError.getDefaultMessage());
        }
    }
}
