package com.imulatsiya.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DisplayConfigDto {

    private List<KioskAppDto> apps;
    private List<AdBannerDto> ads;
}
