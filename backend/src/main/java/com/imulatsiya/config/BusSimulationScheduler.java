package com.imulatsiya.config;

import com.imulatsiya.service.BusSimulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BusSimulationScheduler {

    private final BusSimulationService busSimulationService;

    @Value("${bus.simulation.tick-interval-ms:1000}")
    private long tickIntervalMs;

    @Scheduled(fixedRateString = "${bus.simulation.tick-interval-ms:1000}")
    public void simulate() {
        busSimulationService.tick();
    }
}
