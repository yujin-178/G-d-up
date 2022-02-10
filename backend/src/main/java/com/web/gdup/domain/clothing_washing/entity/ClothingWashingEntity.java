package com.web.gdup.domain.clothing_washing.entity;

import com.web.gdup.domain.washing_method.entity.WashingMethodEntity;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clothing_washing")
@IdClass(ClothingWashingId.class)
@ToString
@Builder
@Getter
public class ClothingWashingEntity implements Serializable {
    @Id
    private int clothingid;

    @Id
    @OneToOne
    @JoinColumn(name = "washingid")
    private WashingMethodEntity washingMethod;
}

