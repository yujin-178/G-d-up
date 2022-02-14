package com.web.gdup.domain.user.Entity;

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
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "user")
public class UserEntity {
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
