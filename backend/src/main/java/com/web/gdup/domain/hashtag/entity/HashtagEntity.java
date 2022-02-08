package com.web.gdup.domain.hashtag.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@ToString
@Builder
@Table(name = "hashtag")
public class HashtagEntity {
    @Id
    @Column(name = "tagname")
    private String tagName;
}
