package com.imulatsiya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ImulatsiyaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImulatsiyaApplication.class, args);
    }
}
