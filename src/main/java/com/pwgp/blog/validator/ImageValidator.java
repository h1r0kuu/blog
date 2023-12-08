package com.pwgp.blog.validator;

import com.pwgp.blog.annotations.ImageValidation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

public class ImageValidator implements ConstraintValidator<ImageValidation, MultipartFile> {

    private final List<String> validImageTypes = Arrays.asList("image/jpeg", "image/png", "image/jpg", "image/gif");

    @Override
    public void initialize(ImageValidation constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(MultipartFile image, ConstraintValidatorContext constraintValidatorContext) {
        return image == null || validImageTypes.contains(image.getContentType());
    }
}
