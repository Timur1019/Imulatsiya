package com.imulatsiya.mapper;

import com.imulatsiya.dto.KioskAppDto;
import com.imulatsiya.entity.AppLinkType;
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
                .linkType(entity.getLinkType() != null ? entity.getLinkType().name() : AppLinkType.OPEN_URL.name())
                .sortOrder(entity.getSortOrder())
                .active(entity.getActive())
                .build();
    }

    @Override
    public KioskApp toEntity(KioskAppDto dto) {
        AppLinkType linkType = AppLinkType.OPEN_URL;
        if (dto.getLinkType() != null) {
            try {
                linkType = AppLinkType.valueOf(dto.getLinkType());
            } catch (IllegalArgumentException ignored) {
                linkType = AppLinkType.OPEN_URL;
            }
        }
        return KioskApp.builder()
                .id(dto.getId())
                .name(dto.getName())
                .iconUrl(dto.getIconUrl())
                .linkUrl(dto.getLinkUrl())
                .linkType(linkType)
                .sortOrder(dto.getSortOrder())
                .active(dto.getActive())
                .build();
    }
}
