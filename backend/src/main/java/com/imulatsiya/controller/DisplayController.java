package com.imulatsiya.controller;

import com.imulatsiya.dto.*;
import com.imulatsiya.service.AdBannerService;
import com.imulatsiya.service.BusSimulationService;
import com.imulatsiya.service.DisplayConfigService;
import com.imulatsiya.service.KioskAppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Display API")
public class DisplayController {

    private final KioskAppService kioskAppService;
    private final AdBannerService adBannerService;
    private final DisplayConfigService displayConfigService;
    private final BusSimulationService busSimulationService;

    @GetMapping("/apps")
    @Operation(summary = "Список всех приложений")
    @ApiResponse(responseCode = "200", description = "OK")
    public List<KioskAppDto> getApps() {
        return kioskAppService.findAll();
    }

    @GetMapping("/apps/active")
    @Operation(summary = "Активные приложения для киоска")
    public List<KioskAppDto> getActiveApps() {
        return kioskAppService.findActive();
    }

    @PostMapping("/apps")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Создать приложение")
    public KioskAppDto createApp(@Valid @RequestBody KioskAppDto dto) {
        return kioskAppService.create(dto);
    }

    @PutMapping("/apps/{id}")
    @Operation(summary = "Обновить приложение")
    public KioskAppDto updateApp(@PathVariable Long id, @Valid @RequestBody KioskAppDto dto) {
        return kioskAppService.update(id, dto);
    }

    @DeleteMapping("/apps/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Удалить приложение")
    public void deleteApp(@PathVariable Long id) {
        kioskAppService.delete(id);
    }

    @GetMapping("/ads")
    @Operation(summary = "Список всей рекламы")
    public List<AdBannerDto> getAds() {
        return adBannerService.findAll();
    }

    @GetMapping("/ads/active")
    @Operation(summary = "Активная реклама для экрана")
    public List<AdBannerDto> getActiveAds() {
        return adBannerService.findActive();
    }

    @PostMapping("/ads")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Создать рекламный баннер")
    public AdBannerDto createAd(@Valid @RequestBody AdBannerDto dto) {
        return adBannerService.create(dto);
    }

    @PutMapping("/ads/{id}")
    @Operation(summary = "Обновить рекламный баннер")
    public AdBannerDto updateAd(@PathVariable Long id, @Valid @RequestBody AdBannerDto dto) {
        return adBannerService.update(id, dto);
    }

    @DeleteMapping("/ads/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Удалить рекламный баннер")
    public void deleteAd(@PathVariable Long id) {
        adBannerService.delete(id);
    }

    @GetMapping("/display/config")
    @Operation(summary = "Конфигурация для экранов")
    public DisplayConfigDto getDisplayConfig() {
        return displayConfigService.getConfig();
    }

    @PostMapping("/display/publish")
    @Operation(summary = "Опубликовать конфигурацию на экраны")
    public DisplayConfigDto publish(@Valid @RequestBody PublishConfigRequest request) {
        return displayConfigService.publish(request.getApps(), request.getAds());
    }

    @GetMapping("/buses/status")
    @Operation(summary = "Текущий статус автобусов (симуляция)")
    public List<BusStatusDto> getBusStatus() {
        return busSimulationService.getCurrentStatus();
    }
}
