package com.imulatsiya.mapper;

import com.imulatsiya.dto.AdBannerDto;
import com.imulatsiya.entity.AdBanner;
import com.imulatsiya.entity.AdMediaType;
import org.springframework.stereotype.Component;

@Component
public class AdBannerMapper implements BaseMapper<AdBanner, AdBannerDto> {

    @Override
    public AdBannerDto toDto(AdBanner entity) {
        return AdBannerDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .mediaType(entity.getMediaType() != null ? entity.getMediaType().name() : null)
                .mediaUrl(entity.getMediaUrl())
                .backgroundColor(entity.getBackgroundColor())
                .durationSeconds(entity.getDurationSeconds())
                .sortOrder(entity.getSortOrder())
                .active(entity.getActive())
                .build();
    }

    @Override
    public AdBanner toEntity(AdBannerDto dto) {
        AdMediaType mediaType = AdMediaType.IMAGE;
        if (dto.getMediaType() != null) {
            try {
                mediaType = AdMediaType.valueOf(dto.getMediaType());
            } catch (IllegalArgumentException ignored) {
                mediaType = AdMediaType.IMAGE;
            }
        }
        return AdBanner.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .mediaType(mediaType)
                .mediaUrl(dto.getMediaUrl())
                .backgroundColor(dto.getBackgroundColor())
                .durationSeconds(dto.getDurationSeconds())
                .sortOrder(dto.getSortOrder())
                .active(dto.getActive())
                .build();
    }
}
