package com.imulatsiya.service.impl;

import com.imulatsiya.dto.KioskAppDto;
import com.imulatsiya.entity.KioskApp;
import com.imulatsiya.exception.NotFoundException;
import com.imulatsiya.mapper.KioskAppMapper;
import com.imulatsiya.repository.KioskAppRepository;
import com.imulatsiya.service.KioskAppService;
import com.imulatsiya.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KioskAppServiceImpl implements KioskAppService {

    private final KioskAppRepository repository;
    private final KioskAppMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<KioskAppDto> findAll() {
        return repository.findAllByOrderBySortOrderAsc().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<KioskAppDto> findActive() {
        return repository.findAllByOrderBySortOrderAsc().stream()
                .filter(KioskApp::getActive)
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public KioskAppDto create(KioskAppDto dto) {
        KioskApp entity = mapper.toEntity(dto);
        entity.setId(null);
        KioskApp saved = repository.save(entity);
        LogUtil.info("Создано приложение: {}", saved.getName());
        return mapper.toDto(saved);
    }

    @Override
    @Transactional
    public KioskAppDto update(Long id, KioskAppDto dto) {
        KioskApp entity = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Приложение не найдено: " + id));
        entity.setName(dto.getName());
        entity.setIconUrl(dto.getIconUrl());
        entity.setLinkUrl(dto.getLinkUrl());
        entity.setSortOrder(dto.getSortOrder());
        entity.setActive(dto.getActive());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Приложение не найдено: " + id);
        }
        repository.deleteById(id);
        LogUtil.info("Удалено приложение id={}", id);
    }

    @Override
    @Transactional
    public List<KioskAppDto> saveAll(List<KioskAppDto> apps) {
        repository.deleteAll();
        List<KioskApp> entities = apps.stream()
                .map(dto -> {
                    KioskApp entity = mapper.toEntity(dto);
                    entity.setId(null);
                    return entity;
                })
                .collect(Collectors.toList());
        return repository.saveAll(entities).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
