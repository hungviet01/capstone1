package com.football.district;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/districts")
@RequiredArgsConstructor
public class DistrictController {

    private final DistrictService districtService;

    @GetMapping("/{provinceId}")
    public ResponseEntity<List<DistrictDto>> findDistrictByProvince(@PathVariable Long provinceId) {
        List<DistrictDto> districts = this.districtService.findByProvinceId(provinceId);
        return ResponseEntity.ok(districts);
    }
}
