package com.example.airmed;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.swing.text.Style;

@SpringBootApplication
public class AirmedApplication {
    public static void main(String[] args) {
        SpringApplication.run(AirmedApplication.class, args);
    }

    @Bean
    ApplicationRunner applicationRunner(){
        return args ->{
            System.out.println("Take care of your mental health!");
        };
    }

}
