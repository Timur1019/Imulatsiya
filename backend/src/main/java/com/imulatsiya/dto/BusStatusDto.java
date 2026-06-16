package com.imulatsiya.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusStatusDto {

    private String routeNumber;
    private String routeName;
    private String headsign;
    private boolean circular;
    private Integer intervalMinutes;
    private String serviceFrom;
    private String serviceTo;
    private String photoUrl;
    private String currentStop;
    private String nextStop;
    private int etaMinutes;
    private double progressPercent;
    private String status;
    private List<String> stops;
}
