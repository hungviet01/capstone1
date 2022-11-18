package com.football.request.detail;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "_REQUEST_DETAIL")
public class RequestDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "requester")
    private String requester;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "status")
    private Integer status;

    @Column(name = "parent_id")
    private Long parentId;
}
