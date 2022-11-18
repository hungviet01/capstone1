package com.football.bill;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;

/**
 * A DTO for the {@link Bill} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDto implements Serializable {
    private String id;
    private String username;
    private Date createdDate;
    private BigDecimal total;
    private Integer status;
    public String getStatusName() {
        if (Objects.isNull(this.status)) return "";
        return BillStatus.fromStatus(this.status).getStatusName();
    }
}