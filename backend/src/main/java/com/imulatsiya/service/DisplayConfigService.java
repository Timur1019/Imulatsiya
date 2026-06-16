package com.imulatsiya.service;

import com.imulatsiya.dto.DisplayConfigDto;
import com.imulatsiya.dto.KioskAppDto;
import com.imulatsiya.dto.AdBannerDto;

import java.util.List;

public interface DisplayConfigService {

    DisplayConfigDto getConfig();

    DisplayConfigDto publish(List<KioskAppDto> apps, List<AdBannerDto> ads);
}
