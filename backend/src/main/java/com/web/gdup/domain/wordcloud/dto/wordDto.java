package com.web.gdup.domain.wordcloud.dto;

import lombok.*;

@NoArgsConstructor
@Getter
@ToString
@Builder
@AllArgsConstructor
public class wordDto {
    private String tagName;
    private int weight;
}
