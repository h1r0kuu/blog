package com.pwgp.blog.service.impl;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.pwgp.blog.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    @Value("${firebase.bucket.name}")
    private String bucketName;

    @Value("${firebase.get.image.url}")
    private String getImageUrl;

    @Value("${firebase.key.filename}")
    private String firebaseFilename;

    @Override
    public String uploadFile(MultipartFile multipartFile, String fileName) throws IOException {
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        ClassPathResource account = new ClassPathResource(firebaseFilename);
        Credentials credentials = GoogleCredentials.fromStream(account.getInputStream());
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, multipartFile.getBytes());

        return String.format(getImageUrl, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    @Override
    public String upload(MultipartFile multipartFile) {
        try {
            String fileName = multipartFile.getOriginalFilename();
            fileName = UUID.randomUUID().toString().concat(getExtension(fileName));

            return uploadFile(multipartFile, fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return "Image couldn't upload, Something went wrong";
        }
    }
}