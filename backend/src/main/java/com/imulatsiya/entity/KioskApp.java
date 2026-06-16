package com.imulatsiya.entity;

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

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    @Column(nullable = false)
    private Boolean active;
}
