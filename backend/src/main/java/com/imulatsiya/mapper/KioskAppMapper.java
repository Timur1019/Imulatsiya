package com.imulatsiya.mapper;

import com.imulatsiya.dto.KioskAppDto;
import com.imulatsiya.entity.KioskApp;
import org.springframework.stereotype.Component;

@Component
public class KioskAppMapper implements BaseMapper<KioskApp, KioskAppDto> {

    @Override
    public KioskAppDto toDto(KioskApp entity) {
        return KioskAppDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .iconUrl(entity.getIconUrl())
                .linkUrl(entity.getLinkUrl())
                .sortOrder(entity.getSortOrder())
                .active(entity.getActive())
                .build();
    }

    @Override
    public KioskApp toEntity(KioskAppDto dto) {
        return KioskApp.builder()
                .id(dto.getId())
                .name(dto.getName())
                .iconUrl(dto.getIconUrl())
                .linkUrl(dto.getLinkUrl())
                .sortOrder(dto.getSortOrder())
                .active(dto.getActive())
                .build();
    }
}
