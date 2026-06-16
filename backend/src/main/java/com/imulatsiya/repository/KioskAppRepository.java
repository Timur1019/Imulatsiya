package com.imulatsiya.repository;

import com.imulatsiya.entity.KioskApp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KioskAppRepository extends JpaRepository<KioskApp, Long> {

    List<KioskApp> findAllByOrderBySortOrderAsc();
}
