create table if not exists _CATEGORY
(
    id   int auto_increment
    primary key,
    name varchar(100) charset utf8mb3 not null
    );

create table if not exists _FEEDBACK
(
    id           int auto_increment
    primary key,
    full_name    varchar(255) charset utf8mb3 null,
    phone        varchar(20)                  null,
    email        varchar(255)                 null,
    content      text                         null,
    created_date date                         null
    );

create table if not exists _PRODUCT
(
    id           varchar(255)                 not null
    primary key,
    category_id  int                          not null,
    name         varchar(255) charset utf8mb3 not null,
    description  text                         null,
    price        double                       not null,
    quantity     int                          not null,
    created_date date                         null,
    avatar       text                         null,
    status       int                          null,
    constraint _PRODUCT__CATEGORY_id_fk
    foreign key (category_id) references _CATEGORY (id)
    );

create table if not exists _PRODUCT_IMAGE
(
    id         int auto_increment
    primary key,
    url        text         null,
    product_id varchar(255) null,
    constraint _PRODUCT_IMAGE__PRODUCT_id_fk
    foreign key (product_id) references _PRODUCT (id)
    );

create table if not exists _PROVINCE
(
    id   int auto_increment
    primary key,
    name varchar(1000) charset utf8mb3 null
    );

create table if not exists _DISTRICT
(
    id          int auto_increment
    primary key,
    name        varchar(100) charset utf8mb3 null,
    province_id int                          null,
    constraint _DISTRICT__PROVINCE_id_fk
    foreign key (province_id) references _PROVINCE (id)
    );

create table if not exists _SIZE
(
    id         int auto_increment
    primary key,
    name       varchar(200) charset utf8mb3 null,
    product_id varchar(255)                 null,
    constraint _SIZE__PRODUCT_id_fk
    foreign key (product_id) references _PRODUCT (id)
    );

create table if not exists _USER
(
    id        varchar(255)                 not null
    primary key,
    username  varchar(300)                 not null,
    password  text                         not null,
    phone     varchar(20)                  not null,
    email     varchar(100)                 not null,
    role      varchar(100)                 null,
    otp_code  varchar(20)                  null,
    status    int                          null,
    full_name varchar(100) charset utf8mb3 not null,
    constraint _USER_username_uindex
    unique (username)
    );

create table if not exists _BILL
(
    id           varchar(255)                 not null
    primary key,
    created_by   varchar(255)                 not null,
    full_name    varchar(255) charset utf8mb3 null,
    phone        varchar(20)                  null,
    address      varchar(255) charset utf8mb3 null,
    created_date date                         null,
    total        double                       not null,
    status       int                          not null,
    constraint _BILL__USER_username_fk
    foreign key (created_by) references _USER (username)
    );

create table if not exists _BILL_DETAIL
(
    id         bigint auto_increment
    primary key,
    bill_id    varchar(255)   null,
    price      decimal(19, 2) null,
    product_id varchar(255)   null,
    quantity   bigint         null,
    size_id    int            null,
    constraint _BILL_DETAIL__BILL_id_fk
    foreign key (bill_id) references _BILL (id),
    constraint _BILL_DETAIL__PRODUCT_id_fk
    foreign key (product_id) references _PRODUCT (id),
    constraint _BILL_DETAIL__SIZE_id_fk
    foreign key (size_id) references _SIZE (id)
    );

create table if not exists _CART
(
    id         int auto_increment
    primary key,
    product_id varchar(255) not null,
    quantity   int          not null,
    username   varchar(100) not null,
    size_id    int          null,
    constraint _CART__PRODUCT_id_fk
    foreign key (product_id) references _PRODUCT (id),
    constraint _CART__SIZE_id_fk
    foreign key (size_id) references _SIZE (id),
    constraint _CART__USER_username_fk
    foreign key (username) references _USER (username)
    );

create table if not exists _STADIUM
(
    id           varchar(255) not null
    primary key,
    name         varchar(100) not null,
    address      text         not null,
    district_id  int          not null,
    province_id  int          not null,
    avatar       text         not null,
    description  text         null,
    created_by   varchar(300) not null,
    created_date datetime     not null,
    status       int          not null,
    constraint _STADIUM__USER_username_fk
    foreign key (created_by) references _USER (username)
    );

create table if not exists _STADIUM_IMAGE
(
    id         int auto_increment
    primary key,
    image      text         not null,
    stadium_id varchar(255) not null,
    constraint _STADIUM_IMAGE__STADIUM_id_fk
    foreign key (stadium_id) references _STADIUM (id)
    );

create table if not exists _STADIUM_OPTION
(
    id         int auto_increment
    primary key,
    name       varchar(100) not null,
    stadium_id varchar(255) not null,
    constraint _STADIUM_OPTION__STADIUM_id_fk
    foreign key (stadium_id) references _STADIUM (id)
    );

create table if not exists _STADIUM_TYPE
(
    id         int auto_increment
    primary key,
    name       varchar(100) not null,
    stadium_id varchar(255) null,
    quantity   int          null,
    constraint _STADIUM_TYPE__STADIUM_id_fk
    foreign key (stadium_id) references _STADIUM (id)
    );

create table if not exists _STADIUM_DETAIL
(
    id         int auto_increment
    primary key,
    start_time time    null,
    end_time   time    null,
    price      decimal null,
    parent_id  int     not null,
    constraint _STADIUM_DETAIL__STADIUM_TYPE_id_fk
    foreign key (parent_id) references _STADIUM_TYPE (id)
    );

create table if not exists _REQUEST
(
    id                int auto_increment
    primary key,
    created_date      datetime     not null,
    created_by        varchar(100) not null,
    status            int          not null,
    has_competitor    tinyint(1)   not null,
    stadium_detail_id int          not null,
    competitor_id     varchar(100) null,
    hire_date         date         not null,
    constraint _REQUEST__STADIUM_DETAIL_id_fk
    foreign key (stadium_detail_id) references _STADIUM_DETAIL (id),
    constraint _REQUEST__USER_username_fk
    foreign key (created_by) references _USER (username)
    );

create table if not exists _REQUEST_DETAIL
(
    id           int auto_increment
    primary key,
    requester    varchar(100) not null,
    created_date datetime     null,
    status       int          not null,
    parent_id    int          not null,
    constraint _REQUEST_DETAIL__REQUEST_id_fk
    foreign key (parent_id) references _REQUEST (id),
    constraint _REQUEST_DETAIL__USER_username_fk
    foreign key (requester) references _USER (username)
    );
