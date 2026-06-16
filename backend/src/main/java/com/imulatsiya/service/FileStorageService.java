package com.imulatsiya.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    /**
     * @return public URL path (e.g. /uploads/... )
     */
    String storeAdMedia(MultipartFile file);

    /**
     * @return public URL path (e.g. /uploads/... )
     */
    String storeAppIcon(MultipartFile file);
}

