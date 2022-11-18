package com.football.user;

public class UserUtils {

    public static String generateOtp() {
        Integer v = (int) Math.ceil((Math.random() * 899999)) + 100000;
        return v.toString();
    }
}
