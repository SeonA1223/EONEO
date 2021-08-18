package com.kyp.eoneo.config;

import com.kyp.eoneo.config.interceptor.MyChannelInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final MyChannelInterceptor myChannelInterceptor;



    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/chatEonoe-websocket").setAllowedOrigins("https://i5a102.p.ssafy.io", "wss://15a102.p.ssafy.io", "wss://15a102.p.ssafy.io:3000",
                "wss://15a102.p.ssafy.io:8080", "https://i5a102.p.ssafy.io:8080", "https://i5a102.p.ssafy.io:3000","http://172.22.0.1:3000").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/subscribe"); //topic <- 메시지를 유저 또는 destination에 보내기 위한 prefixes
        registry.setApplicationDestinationPrefixes("/publish");  //app <- @MessageMapping으로 가는 친구, 구독한다고 알리는 느낌!
        registry.setUserDestinationPrefix("/subscribe");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(myChannelInterceptor);
    }
}
