package com.web.gdup.domain.comment.dto;

import com.web.gdup.domain.comment.Entity.CommentEntity;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private int feedId;

    private String content;

    private String writerName;

    public CommentEntity toEntity(){
        CommentEntity build = CommentEntity.builder()
                .feedId(feedId)
                .content(content)
                .writerName(writerName)
                .build();
        return  build;
    }
}
