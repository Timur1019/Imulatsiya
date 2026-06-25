package com.imulatsiya.service.impl;

import com.imulatsiya.dto.DeviceTriggerResponseDto;
import com.imulatsiya.service.DeviceTriggerService;
import com.imulatsiya.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceTriggerServiceImpl implements DeviceTriggerService {

    @Override
    public DeviceTriggerResponseDto triggerWaterCooler() {
        LogUtil.info("Команда на кулер: выдача бесплатной воды");
        return DeviceTriggerResponseDto.builder()
                .success(true)
                .device("water-cooler")
                .message("Команда отправлена на кулер")
                .build();
    }

    @Override
    public DeviceTriggerResponseDto triggerSos() {
        LogUtil.info("SOS: экстренный вызов");
        return DeviceTriggerResponseDto.builder()
                .success(true)
                .device("sos")
                .message("SOS сигнал отправлен")
                .build();
    }
}
