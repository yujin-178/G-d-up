package com.web.gdup.domain.clothing_hashtag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clothing_hashtag")
@IdClass(ClothingHashtagID.class)
@ToString
@Getter
public class ClothingHashtagDto implements Serializable {
    @Id
    @Column(name = "tagname")
    private String tagName;

    @Id
    @Column(name = "clothingid")
    private int clothingId;

    private LocalDateTime registrationDate;
}
