package com.football.firebase;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class FirebaseService {

    @Value("${spring.firebase.pattern-url}")
    private String patternUrl;

    public String uploadImage(MultipartFile file) {
        try {
            log.info("uploading an image to firebase");
            Bucket bucket = StorageClient.getInstance().bucket();
            Blob blob = bucket.create(FirebaseUtils.generateFileName(file.getOriginalFilename()), file.getBytes(), file.getContentType());
            log.info(blob.getMediaLink());
            return this.patternUrl.replace("{0}", blob.getName());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw new IllegalArgumentException(ex);
        }
    }
}
