package com.web.gdup.domain.follow.dto;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "follow")
@IdClass(FollowId.class)
@ToString
@Getter

public class FollowDto implements Serializable {

    @Id
    @Column(name = "username")
   private String userName;

    @Id
   private String following;


}
