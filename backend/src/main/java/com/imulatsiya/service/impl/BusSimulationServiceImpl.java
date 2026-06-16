package com.imulatsiya.service.impl;

import com.imulatsiya.dto.BusStatusDto;
import com.imulatsiya.service.BusSimulationService;
import com.imulatsiya.util.bus.BusRouteDefinition;
import com.imulatsiya.util.bus.BusRouteDefinitions;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class BusSimulationServiceImpl implements BusSimulationService {

    private static final double SEGMENT_SPEED = 0.08;

    private final List<SimulatedBus> buses = new CopyOnWriteArrayList<>();

    @PostConstruct
    void init() {
        for (BusRouteDefinition route : BusRouteDefinitions.getAll()) {
            buses.add(new SimulatedBus(route, 0, Math.random()));
        }
    }

    @Override
    public List<BusStatusDto> getCurrentStatus() {
        List<BusStatusDto> result = new ArrayList<>();
        for (SimulatedBus bus : buses) {
            result.add(bus.toDto());
        }
        return result;
    }

    @Override
    public void tick() {
        for (SimulatedBus bus : buses) {
            bus.advance(SEGMENT_SPEED);
        }
    }

    @Getter
    private static class SimulatedBus {

        private final BusRouteDefinition route;
        private final List<String> stops;
        private int currentStopIndex;
        private double segmentProgress;
        private boolean forward = true;

        SimulatedBus(BusRouteDefinition route, int currentStopIndex, double segmentProgress) {
            this.route = route;
            this.stops = route.getStops();
            this.currentStopIndex = currentStopIndex;
            this.segmentProgress = segmentProgress;
        }

        void advance(double speed) {
            segmentProgress += speed;
            if (segmentProgress >= 1.0) {
                segmentProgress = 0;
                if (forward) {
                    currentStopIndex++;
                    if (currentStopIndex >= stops.size() - 1) {
                        forward = false;
                    }
                } else {
                    currentStopIndex--;
                    if (currentStopIndex <= 0) {
                        forward = true;
                    }
                }
            }
        }

        BusStatusDto toDto() {
            int nextIndex = forward
                    ? Math.min(currentStopIndex + 1, stops.size() - 1)
                    : Math.max(currentStopIndex - 1, 0);

            String currentStop = stops.get(currentStopIndex);
            String nextStop = stops.get(nextIndex);
            // Имитация ETA: базово 1.5 минуты на сегмент между остановками
            int remainingSegments = forward
                    ? stops.size() - 1 - currentStopIndex
                    : currentStopIndex;
            double remainingProgress = 1.0 - segmentProgress;
            double minutesPerSegment = 1.5;
            int etaMinutes = Math.max(1, (int) Math.ceil(remainingSegments * minutesPerSegment + remainingProgress * minutesPerSegment));

            String status;
            if (segmentProgress < 0.05) {
                status = "На остановке";
            } else if (segmentProgress > 0.85) {
                status = "Подъезжает";
            } else {
                status = "В пути";
            }

            double totalSegments = stops.size() - 1;
            double overallProgress = forward
                    ? ((currentStopIndex + segmentProgress) / totalSegments) * 100
                    : ((stops.size() - 1 - currentStopIndex + segmentProgress) / totalSegments) * 100;

            return BusStatusDto.builder()
                    .routeNumber(route.getRouteNumber())
                    .routeName(route.getRouteName())
                    .headsign(route.getHeadsign())
                    .circular(route.isCircular())
                    .intervalMinutes(route.getIntervalMinutes())
                    .serviceFrom(route.getServiceFrom())
                    .serviceTo(route.getServiceTo())
                    .photoUrl(route.getPhotoUrl())
                    .currentStop(currentStop)
                    .nextStop(nextStop)
                    .etaMinutes(etaMinutes)
                    .progressPercent(Math.min(100, Math.max(0, overallProgress)))
                    .status(status)
                    .stops(stops)
                    .build();
        }
    }
}
