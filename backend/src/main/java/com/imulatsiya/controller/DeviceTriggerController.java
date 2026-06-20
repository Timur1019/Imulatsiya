package com.imulatsiya.controller;

import com.imulatsiya.dto.DeviceTriggerResponseDto;
import com.imulatsiya.service.DeviceTriggerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kiosk/devices")
@RequiredArgsConstructor
@Tag(name = "Kiosk Devices")
public class DeviceTriggerController {

    private final DeviceTriggerService deviceTriggerService;

    @GetMapping("/water")
    @Operation(summary = "Команда кулеру — выдача бесплатной воды")
    @ApiResponse(responseCode = "200", description = "Команда принята")
    public DeviceTriggerResponseDto triggerWater() {
        return deviceTriggerService.triggerWaterCooler();
    }
}
