package com.web.gdup.domain.user.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "user")
public class UserDto {

    @Id
    private String userName;


    private String password;
    private String address;
    private String email;
    private String introduction;
}
