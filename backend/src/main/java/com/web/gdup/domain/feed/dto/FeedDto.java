package com.web.gdup.domain.feed.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity // db와 맵핑될 엔티티라는 것을 명시, JPA에 관리 대상임
@NoArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "feed")
public class FeedDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int feedId;

    private String content;
    private String registrationDate;
    private int codyId;
    private String userName;

}
