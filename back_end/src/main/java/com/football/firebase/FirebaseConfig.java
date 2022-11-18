package com.football.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${spring.firebase.project-id}")
    private String projectId;

    @Value("${spring.firebase.bucket-name}")
    private String bucketName;

    @PostConstruct
    public void firebase() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("config/firebase.json");

        FirebaseOptions firebaseOptions = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(classPathResource.getInputStream()))
                .setProjectId(this.projectId)
                .setStorageBucket(this.bucketName)
                .build();

        FirebaseApp.initializeApp(firebaseOptions);
    }
}
