package com.pwgp.blog.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String uploadFile(MultipartFile multipartFile, String fileName) throws IOException;
    String upload(MultipartFile multipartFile);
}