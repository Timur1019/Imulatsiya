package com.imulatsiya.service.impl;

import com.imulatsiya.dto.AdBannerDto;
import com.imulatsiya.entity.AdBanner;
import com.imulatsiya.exception.NotFoundException;
import com.imulatsiya.mapper.AdBannerMapper;
import com.imulatsiya.repository.AdBannerRepository;
import com.imulatsiya.service.AdBannerService;
import com.imulatsiya.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdBannerServiceImpl implements AdBannerService {

    private final AdBannerRepository repository;
    private final AdBannerMapper mapper;

    @Override
    @Transactional(readOnly = true)
    public List<AdBannerDto> findAll() {
        return repository.findAllByOrderBySortOrderAsc().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AdBannerDto> findActive() {
        return repository.findAllByOrderBySortOrderAsc().stream()
                .filter(AdBanner::getActive)
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AdBannerDto create(AdBannerDto dto) {
        AdBanner entity = mapper.toEntity(dto);
        entity.setId(null);
        AdBanner saved = repository.save(entity);
        LogUtil.info("Создан баннер: {}", saved.getTitle());
        return mapper.toDto(saved);
    }

    @Override
    @Transactional
    public AdBannerDto update(Long id, AdBannerDto dto) {
        AdBanner entity = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Реклама не найдена: " + id));
        entity.setTitle(dto.getTitle());
        entity.setMediaUrl(dto.getMediaUrl());
        // mediaType приходит строкой в DTO, нормализуем в маппере, но при update обновим вручную
        entity.setMediaType(mapper.toEntity(dto).getMediaType());
        entity.setBackgroundColor(dto.getBackgroundColor());
        entity.setDurationSeconds(dto.getDurationSeconds());
        entity.setSortOrder(dto.getSortOrder());
        entity.setActive(dto.getActive());
        return mapper.toDto(repository.save(entity));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Реклама не найдена: " + id);
        }
        repository.deleteById(id);
        LogUtil.info("Удалена реклама id={}", id);
    }

    @Override
    @Transactional
    public List<AdBannerDto> saveAll(List<AdBannerDto> ads) {
        repository.deleteAll();
        List<AdBanner> entities = ads.stream()
                .map(dto -> {
                    AdBanner entity = mapper.toEntity(dto);
                    entity.setId(null);
                    return entity;
                })
                .collect(Collectors.toList());
        return repository.saveAll(entities).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
