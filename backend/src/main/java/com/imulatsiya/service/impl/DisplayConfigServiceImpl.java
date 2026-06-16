package com.imulatsiya.service.impl;

import com.imulatsiya.dto.AdBannerDto;
import com.imulatsiya.dto.DisplayConfigDto;
import com.imulatsiya.dto.KioskAppDto;
import com.imulatsiya.service.AdBannerService;
import com.imulatsiya.service.DisplayConfigService;
import com.imulatsiya.service.KioskAppService;
import com.imulatsiya.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DisplayConfigServiceImpl implements DisplayConfigService {

    private final KioskAppService kioskAppService;
    private final AdBannerService adBannerService;

    @Override
    @Transactional(readOnly = true)
    public DisplayConfigDto getConfig() {
        return DisplayConfigDto.builder()
                .apps(kioskAppService.findActive())
                .ads(adBannerService.findActive())
                .build();
    }

    @Override
    @Transactional
    public DisplayConfigDto publish(List<KioskAppDto> apps, List<AdBannerDto> ads) {
        List<KioskAppDto> savedApps = kioskAppService.saveAll(apps);
        List<AdBannerDto> savedAds = adBannerService.saveAll(ads);
        LogUtil.info("Опубликована конфигурация: {} приложений, {} рекламных баннеров",
                savedApps.size(), savedAds.size());
        return DisplayConfigDto.builder()
                .apps(savedApps)
                .ads(savedAds)
                .build();
    }
}
