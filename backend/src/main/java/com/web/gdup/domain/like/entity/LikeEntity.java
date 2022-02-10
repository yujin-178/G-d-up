package com.web.gdup.domain.like.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Table(name = "likes")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeid")
    private int likeId;

    @Column(name = "feedid")
    private int feedId;

    @Column(name = "username")
    private String userName;

}
