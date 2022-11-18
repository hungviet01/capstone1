package com.football.stadium;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "_STADIUM")
public class Stadium {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "district_id", nullable = false)
    private Long districtId;

    @Column(name = "province_id", nullable = false)
    private Long provinceId;

    @Lob
    @Column(name = "avatar", nullable = false)
    private String avatar;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "created_by", nullable = false, length = 300)
    private String createdBy;

    @Column(name = "created_date")
    private Timestamp createdDate;

    @Column(name = "status")
    private Integer status;
}
