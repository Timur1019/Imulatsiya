package com.imulatsiya.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PublishConfigRequest {

    @NotNull
    @Valid
    private List<KioskAppDto> apps;

    @NotNull
    @Valid
    private List<AdBannerDto> ads;
}
