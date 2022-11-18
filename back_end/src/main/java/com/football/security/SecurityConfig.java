package com.football.security;

import com.football.jwt.JwtAuthenticationEntryPoint;
import com.football.jwt.JwtFilter;
import com.football.role.RoleEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtFilter jwtFilter;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods("*");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeHttpRequests()
                .antMatchers(HttpMethod.GET, "/provinces", "/districts/*").permitAll()
                .antMatchers(HttpMethod.GET, "/stadiums/*").permitAll()
                .antMatchers(HttpMethod.GET, "/categories/products").permitAll()
                .antMatchers(HttpMethod.GET, "/products/*").permitAll()
                .antMatchers(HttpMethod.GET, "/products/category/*").permitAll()
                .antMatchers(HttpMethod.GET, "/sizes/**").permitAll()
                .antMatchers(HttpMethod.GET, "/product-image/**").permitAll()
                .antMatchers(HttpMethod.GET, "/stadium-image/*").permitAll()
                .antMatchers(HttpMethod.GET, "/stadium-option/*").permitAll()
                .antMatchers(HttpMethod.GET, "/stadium-detail/*").permitAll()
                .antMatchers(HttpMethod.GET, "/requests/*").permitAll()
                .antMatchers(HttpMethod.GET, "/requests/competitor/*").permitAll()
                .antMatchers(HttpMethod.POST, "/authenticate", "/users", "/users/active", "/users/re-send-mail").permitAll()
                .antMatchers(HttpMethod.POST, "/stadiums/search-stadium", "/stadiums/available-stadium").permitAll()
                .antMatchers(HttpMethod.POST, "/requests").hasAnyAuthority(RoleEnum.USER.name())
                .antMatchers(HttpMethod.POST, "/requests/approve", "/requests/reject").hasAnyAuthority(RoleEnum.OWNER_STADIUM.name())
                .antMatchers(HttpMethod.POST, "/requests/finding-request").hasAnyAuthority(RoleEnum.USER.name())
                .antMatchers(HttpMethod.POST, "/stadiums/*").hasAnyAuthority(RoleEnum.OWNER_STADIUM.name())
                .antMatchers(HttpMethod.POST, "/feedbacks").permitAll()
                .antMatchers(HttpMethod.DELETE, "/stadiums/*").hasAnyAuthority(RoleEnum.OWNER_STADIUM.name())
                .antMatchers("/admin/**").hasAnyAuthority(RoleEnum.ADMIN.name())
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(this.jwtAuthenticationEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(this.jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
