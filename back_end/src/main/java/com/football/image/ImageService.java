package com.football.image;

import com.football.firebase.FirebaseService;
import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageService {

    private final FirebaseService firebaseService;

    public String uploadImage(MultipartFile file) {
        log.info("handle file");
        String url = this.firebaseService.uploadImage(file);
        log.info("after handle file: {}", url);
        return url;
    }
}
