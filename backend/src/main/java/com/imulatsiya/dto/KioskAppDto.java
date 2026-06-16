package com.imulatsiya.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KioskAppDto {

    private Long id;

    @NotBlank(message = "Название обязательно")
    private String name;

    private String iconUrl;

    private String linkUrl;

    @NotNull(message = "Порядок обязателен")
    private Integer sortOrder;

    @NotNull(message = "Статус обязателен")
    private Boolean active;
}
