package com.imulatsiya.service.impl;

import com.imulatsiya.exception.BusinessException;
import com.imulatsiya.service.FileStorageService;
import com.imulatsiya.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl implements FileStorageService {

    private static final Set<String> IMAGE_EXT = Set.of("png", "jpg", "jpeg", "webp", "gif");
    private static final Set<String> VIDEO_EXT = Set.of("mp4", "webm", "mov", "m4v", "ogv");

    @Value("${storage.upload-dir:./data/uploads}")
    private String uploadDir;

    @Override
    public String storeAdMedia(MultipartFile file) {
        String filename = store(file, "ads", IMAGE_EXT, VIDEO_EXT);
        return "/uploads/ads/" + filename;
    }

    @Override
    public String storeAppIcon(MultipartFile file) {
        String filename = store(file, "icons", IMAGE_EXT);
        return "/uploads/icons/" + filename;
    }

    private String store(MultipartFile file, String subDir, Set<String>... allowedExtGroups) {
        if (file == null || file.isEmpty()) {
            throw new BusinessException("Файл не выбран");
        }

        String original = file.getOriginalFilename();
        String clean = StringUtils.hasText(original) ? Paths.get(original).getFileName().toString() : "file";
        String ext = getExtension(clean);

        boolean allowed = false;
        for (Set<String> group : allowedExtGroups) {
            if (group.contains(ext)) {
                allowed = true;
                break;
            }
        }
        if (!allowed) {
            throw new BusinessException("Неподдерживаемый формат файла: " + ext);
        }

        String safeBase = clean.replaceAll("[^a-zA-Z0-9._-]", "_");
        String targetName = Instant.now().toEpochMilli() + "_" + safeBase;

        Path basePath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path targetDir = basePath.resolve(subDir);
        try {
            Files.createDirectories(targetDir);
            Path targetFile = targetDir.resolve(targetName).normalize();
            if (!targetFile.startsWith(targetDir)) {
                throw new BusinessException("Некорректное имя файла");
            }
            file.transferTo(targetFile);
            LogUtil.info("Uploaded file to {}", targetFile);
            return targetName;
        } catch (IOException e) {
            throw new BusinessException("Не удалось сохранить файл: " + e.getMessage());
        }
    }

    private String getExtension(String name) {
        int idx = name.lastIndexOf('.');
        if (idx < 0 || idx == name.length() - 1) return "";
        return name.substring(idx + 1).toLowerCase();
    }
}

