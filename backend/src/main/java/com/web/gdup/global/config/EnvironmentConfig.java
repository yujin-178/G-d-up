package com.web.gdup.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig {
    @Value("${ximilar.api.key}")
    private String apiKey;

    public String getApiKey() {
        return apiKey;
    }
}
