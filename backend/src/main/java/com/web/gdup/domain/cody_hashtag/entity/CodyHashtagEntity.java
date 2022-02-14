package com.web.gdup.domain.cody_hashtag.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.java.Log;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "cody_hashtag")
@Builder
@Log
@IdClass(CodyHashPK.class)
public class CodyHashtagEntity {
    @Id
    @Column(name = "tagname")
    private String tagName;
    @Id
    @Column(name = "codyid")
    private int codyId;
    @Column(name = "registrationdate")
    private LocalDateTime registrationDate;
}
