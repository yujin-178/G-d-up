package com.web.gdup.domain.cody.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import java.io.Serializable;
@Getter
@ToString
public class CodyClothingPK implements Serializable {
    @Column(name = "codyid")
    private int codyId;
    @Column(name = "clothingid")
    private int clothingId;


}
