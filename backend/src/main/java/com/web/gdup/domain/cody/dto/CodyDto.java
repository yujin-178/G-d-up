package com.web.gdup.domain.cody.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.java.Log;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "cody")
@Builder
@Log
public class CodyDto {
    @Id
    @NonNull
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int codyId;
    String codyName;
    LocalDateTime registrationDate;
    LocalDateTime updateDate;
    String content;
    String userName;
    int secret;
    int imageId;
}
