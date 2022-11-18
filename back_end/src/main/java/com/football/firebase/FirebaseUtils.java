package com.football.firebase;

import org.springframework.util.StringUtils;

import java.util.UUID;

public class FirebaseUtils {

    public static String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }

    public static String generateFileName(String originalFileName) {
        return UUID.randomUUID() + "." + FirebaseUtils.getExtension(originalFileName);
    }
}
