package com.kyp.eoneo.config;


import com.google.common.collect.ImmutableList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
//        log.info("come?");
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://13.124.171.154");
        config.addAllowedOrigin("http://13.124.171.154:3000");
        config.addAllowedOrigin("http://172.22.0.1");
        config.addAllowedOrigin("http://172.22.0.1:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
//        config.addAllowedMethod("PATCH");

        source.registerCorsConfiguration("/**", config); //여기도
        return source;
    }
}
