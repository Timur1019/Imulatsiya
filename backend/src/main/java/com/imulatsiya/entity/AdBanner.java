package com.imulatsiya.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ad_banner")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdBanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 256)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false, length = 16)
    private AdMediaType mediaType;

    @Column(name = "media_url", length = 512)
    private String mediaUrl;

    @Column(name = "background_color", length = 16)
    private String backgroundColor;

    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(nullable = false)
    private Boolean active;
}
