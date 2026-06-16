package com.imulatsiya.repository;

import com.imulatsiya.entity.AdBanner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdBannerRepository extends JpaRepository<AdBanner, Long> {

    List<AdBanner> findAllByOrderBySortOrderAsc();
}
