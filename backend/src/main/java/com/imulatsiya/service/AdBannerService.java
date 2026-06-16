package com.imulatsiya.service;

import com.imulatsiya.dto.AdBannerDto;

import java.util.List;

public interface AdBannerService {

    List<AdBannerDto> findAll();

    List<AdBannerDto> findActive();

    AdBannerDto create(AdBannerDto dto);

    AdBannerDto update(Long id, AdBannerDto dto);

    void delete(Long id);

    List<AdBannerDto> saveAll(List<AdBannerDto> ads);
}
