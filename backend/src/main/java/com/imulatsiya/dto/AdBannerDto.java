package com.imulatsiya.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdBannerDto {

    private Long id;

    @NotBlank(message = "Заголовок обязателен")
    private String title;

    private String mediaType;

    private String mediaUrl;

    private String backgroundColor;

    @NotNull(message = "Длительность обязательна")
    @Min(value = 3, message = "Минимум 3 секунды")
    private Integer durationSeconds;

    @NotNull(message = "Порядок обязателен")
    private Integer sortOrder;

    @NotNull(message = "Статус обязателен")
    private Boolean active;
}
