package com.web.gdup.domain.cody.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@ToString
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "cody")
public class CodyDto {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    long cody_id;
    String cody_name;
    String registration_date;
    String update_date;
    String content;
    String user_name;
    int secret;
    int image_id;
}
