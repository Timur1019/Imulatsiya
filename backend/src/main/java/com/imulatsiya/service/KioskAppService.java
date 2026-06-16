package com.imulatsiya.service;

import com.imulatsiya.dto.KioskAppDto;

import java.util.List;

public interface KioskAppService {

    List<KioskAppDto> findAll();

    List<KioskAppDto> findActive();

    KioskAppDto create(KioskAppDto dto);

    KioskAppDto update(Long id, KioskAppDto dto);

    void delete(Long id);

    List<KioskAppDto> saveAll(List<KioskAppDto> apps);
}
