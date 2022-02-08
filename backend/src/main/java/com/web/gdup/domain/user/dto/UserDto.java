package com.web.gdup.domain.user.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "user")
public class UserDto {

    @Id
    @Column(name = "username")
    @NonNull
    private String userName;

    @NonNull
    private String password;
    private String address;

    @NonNull
    private String email;
    private String introduction;

}
