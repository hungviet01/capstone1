package com.football.stadium;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.util.List;

public class AvailableStadium {

    @Data
    public static class Request {
        @NotBlank
        private String stadiumId;
        private String startDate;
        private String endDate;
        private String startTime;
        private String endTime;
    }

    @Data
    public static class Response {
        private String date;
        private List<Detail> children;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        public static class Detail {
            private Long id;
            private String name;
            private String startTime;
            private String endTime;
            private BigDecimal price;
        }
    }

}
