package com.imulatsiya.util.bus;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class BusRouteDefinition {

    private final String routeNumber;
    private final String headsign;
    private final String routeName;
    private final boolean circular;
    private final int intervalMinutes;
    private final String serviceFrom;
    private final String serviceTo;
    private final String photoUrl;
    private final List<String> stops;
}

