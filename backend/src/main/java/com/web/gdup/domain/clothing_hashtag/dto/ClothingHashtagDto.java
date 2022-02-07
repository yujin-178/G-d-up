package com.web.gdup.domain.clothing_hashtag.dto;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clothing_hashtag")
@IdClass(ClothingHashtagID.class)
@ToString
@Builder
@Getter
public class ClothingHashtagDto implements Serializable {
    @Id
    @Column(name = "tagname")
    private String tagName;

    @Id
    @Column(name = "clothingid")
    private int clothingId;

    @Column(name = "registrationdate")
    private LocalDateTime registrationDate;
}
