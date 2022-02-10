package com.web.gdup.domain.comment.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Table(name = "comment")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commentid")
    private int commentId;
    @Column(name = "originid")
    private int originId;
    @Column(name = "grouporder")
    private int groupOrder;
    @Column(name = "feedid")
    private int feedId;
    private String content;
    @Column(name = "registrationdate", updatable = false)
    private LocalDateTime registrationDate;
    @Column(name = "writername")
    private String writerName;
}
