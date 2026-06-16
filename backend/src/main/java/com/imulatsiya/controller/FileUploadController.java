package com.imulatsiya.controller;

import com.imulatsiya.dto.UploadResponseDto;
import com.imulatsiya.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@Tag(name = "Files API")
public class FileUploadController {

    private final FileStorageService fileStorageService;

    @PostMapping(value = "/ad-media", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Загрузить фото/видео для рекламы")
    public UploadResponseDto uploadAdMedia(@RequestParam("file") MultipartFile file) {
        String url = fileStorageService.storeAdMedia(file);
        return UploadResponseDto.builder()
                .url(url)
                .originalFilename(file.getOriginalFilename())
                .build();
    }

    @PostMapping(value = "/app-icon", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Загрузить иконку приложения (картинка)")
    public UploadResponseDto uploadAppIcon(@RequestParam("file") MultipartFile file) {
        String url = fileStorageService.storeAppIcon(file);
        return UploadResponseDto.builder()
                .url(url)
                .originalFilename(file.getOriginalFilename())
                .build();
    }
}

