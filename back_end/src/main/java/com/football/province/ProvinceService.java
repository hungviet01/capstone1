package com.football.province;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProvinceService {

    private final ProvinceRepository provinceRepository;
    private final ProvinceMapper provinceMapper;

    public List<ProvinceDto> findAll() {
        log.info("find all province");
        return this.provinceRepository
                .findAll()
                .stream()
                .map(this.provinceMapper::toDto)
                .collect(Collectors.toList());
    }
}
