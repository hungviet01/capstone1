package com.football.common.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@Slf4j
@NoArgsConstructor
public class Mapper<ENTITY, DTO> {

    @Autowired
    protected ObjectMapper objectMapper;
    private Class<ENTITY> entityClass;
    private Class<DTO> dtoClass;

    public Mapper(Class<ENTITY> entityClass, Class<DTO> dtoClass) {
        this.entityClass = entityClass;
        this.dtoClass = dtoClass;
    }

    public List<ENTITY> toEntity(List<DTO> dtos) {
        if (Objects.isNull(dtos)) return new ArrayList<>();
        return dtos.stream().map(this::toEntity).collect(Collectors.toList());
    }

    public List<DTO> toDto(List<ENTITY> entities) {
        if (Objects.isNull(entities)) return new ArrayList<>();
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public ENTITY toEntity(DTO dto) {
        log.info("start convert DTO to ENTITY");
        ENTITY entity = this.objectMapper.convertValue(dto, this.entityClass);
        log.info("entity: {}", entity);
        return entity;
    }

    public DTO toDto(ENTITY entity) {
        log.info("start convert ENTITY to DTO");
        DTO dto = this.objectMapper.convertValue(entity, this.dtoClass);
        log.info("dto: {}", dto);
        return dto;
    }
}
