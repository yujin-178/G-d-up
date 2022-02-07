package com.web.gdup.domain.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "follow")
@IdClass(FollowID.class)
@ToString
@Getter
public class FollowDto implements Serializable {

    @Id
    @Column(name = "username")
   private String userName;

    @Id
   private String following;


}
