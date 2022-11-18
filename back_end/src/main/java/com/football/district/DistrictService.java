package com.football.district;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DistrictService {

    private final DistrictRepository districtRepository;
    private final DistrictMapper districtMapper;

    public List<DistrictDto> findByProvinceId(Long provinceId) {
        log.info("find district by province-id: {}", provinceId);
        List<District> districts = this.districtRepository.findByProvinceId(provinceId);
        return districts.stream().map(this.districtMapper::toDto).collect(Collectors.toList());
    }
}
