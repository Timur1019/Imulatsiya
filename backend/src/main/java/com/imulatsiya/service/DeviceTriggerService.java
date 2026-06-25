package com.imulatsiya.service;

import com.imulatsiya.dto.DeviceTriggerResponseDto;

public interface DeviceTriggerService {

    DeviceTriggerResponseDto triggerWaterCooler();

    DeviceTriggerResponseDto triggerSos();
}
