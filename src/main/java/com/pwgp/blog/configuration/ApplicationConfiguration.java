package com.pwgp.blog.configuration;

import jakarta.servlet.MultipartConfigElement;
import org.modelmapper.ModelMapper;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

@Configuration
public class ApplicationConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(5L));
        factory.setMaxRequestSize(DataSize.ofMegabytes(5L));
        return factory.createMultipartConfig();
    }
}
