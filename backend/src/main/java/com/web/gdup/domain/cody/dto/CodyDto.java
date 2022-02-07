package com.web.gdup.domain.cody.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.extern.java.Log;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
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
    int cody_id;
    String cody_name;
    LocalDateTime registration_date;
    LocalDateTime update_date;
    String content;
    String user_name;
    int secret;
    int image_id;
}
