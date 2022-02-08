package com.web.gdup.domain.cody.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.java.Log;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "cody_clothing")
@Builder
@Log
@IdClass(CodyClothingPK.class)
public class CodyClothingInfo {

    @Id
    @Column(name = "codyid")
    private int codyId;

    @Id
    @Column(name = "clothingid")
    private int clothingId;

    private int x;
    private int y;
    private int z;
    private double m;

}
