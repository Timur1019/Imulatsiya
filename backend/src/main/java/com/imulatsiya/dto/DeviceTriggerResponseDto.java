package com.imulatsiya.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceTriggerResponseDto {

    private boolean success;
    private String message;
    private String device;
}
