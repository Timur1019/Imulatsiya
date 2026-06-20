package com.imulatsiya.entity;

import com.imulatsiya.entity.AppLinkType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kiosk_app")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KioskApp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 128)
    private String name;

    @Column(name = "icon_url", length = 512)
    private String iconUrl;

    @Column(name = "link_url", length = 512)
    private String linkUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "link_type", nullable = false, length = 32)
    @Builder.Default
    private AppLinkType linkType = AppLinkType.OPEN_URL;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(nullable = false)
    private Boolean active;
}
