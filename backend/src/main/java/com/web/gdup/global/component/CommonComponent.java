package com.web.gdup.global.component;

import com.web.gdup.global.config.EnvironmentConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommonComponent {
    @Autowired
    private EnvironmentConfig config;

    public EnvironmentConfig getConfig() {
        return config;
    }
}
