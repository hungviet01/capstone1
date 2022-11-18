package com.football.common.utils;

import com.football.common.constant.CommonConstant;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateUtils {

    private static final String DEFAULT_PATTERN_DATE = "yyyy-MM-dd";
    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DEFAULT_PATTERN_DATE);

    public static LocalTime stringToTime(String time) {
        return LocalTime.parse(time);
    }

    public static Date stringToDate(String date) throws ParseException {
        return stringToDate(date, DEFAULT_PATTERN_DATE);
    }

    public static Date stringToDate(String date, String pattern) throws ParseException {
        SimpleDateFormat spf = new SimpleDateFormat(pattern);
        return spf.parse(date);
    }

    public static String dateToString(Date date) {
        return dateToString(date, DEFAULT_PATTERN_DATE);
    }

    public static String dateToString(Date date, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    public static long calculateDurationDaysBetween(String startDate, String endDate) throws ParseException {
        return calculateDurationDaysBetween(simpleDateFormat.parse(startDate), simpleDateFormat.parse(endDate));
    }

    public static long calculateDurationDaysBetween(Date startDate, Date endDate) {
        endDate.setTime(endDate.getTime() + CommonConstant.ONE_DAY_MILI);
        long diffInMillies = Math.abs(endDate.getTime() - startDate.getTime());
        long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        return diff;
    }
}
