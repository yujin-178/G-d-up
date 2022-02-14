package com.web.gdup.domain.user.dto;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import com.web.gdup.domain.user.Entity.UserEntity;
import lombok.*;


@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String password;
    private String email;

    public UserEntity toEntity(){
        UserEntity build = UserEntity.builder()
                .password(password)
                .email(email)
                .build();
        return  build;
    }

}
