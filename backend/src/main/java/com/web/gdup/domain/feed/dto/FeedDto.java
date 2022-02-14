package com.web.gdup.domain.feed.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.web.gdup.domain.cody.entity.CodyEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity // db와 맵핑될 엔티티라는 것을 명시, JPA에 관리 대상임
@NoArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "feed")
public class FeedDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedid")
    private int feedId;

    private String content;

    @Column(updatable = false, name = "registrationdate")
    private LocalDateTime registrationDate;

    @ManyToOne
    @JoinColumn(name = "codyid")
    private CodyEntity cody;

    @Column(name = "username")
    private String userName;

}
