package com.imulatsiya.service;

import com.imulatsiya.dto.BusStatusDto;

import java.util.List;

public interface BusSimulationService {

    List<BusStatusDto> getCurrentStatus();

    void tick();
}
