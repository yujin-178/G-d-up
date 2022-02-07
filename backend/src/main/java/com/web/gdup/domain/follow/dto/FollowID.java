package com.web.gdup.domain.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/* 해당 클래스는 식별자 클래스로, follow 테이블이 복합키로 설정되어 있기 때문에
*  @id 어노테이션이 불가능하다.
* 따라서 @idClass 어노테이션을 시용
*
* @idClass를 생성하기 위해서 다음과 같은 조건을 만족해야함
* 1. 식별자 클래스의 변수명과 엔티티에서 사용되는 변수명이 동일
* 2. 디폴트 생성자가 존재 (@NoArgsContructor 어노테이션 추가로 자동 생성)
* 식별자 클래스의 접근 지정자는 public
* equals, hashcode 구현 (@Data 어노테이션 추가로 자동생성 )
*  */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowID implements Serializable {


    private String userName;
    private String following;


}
