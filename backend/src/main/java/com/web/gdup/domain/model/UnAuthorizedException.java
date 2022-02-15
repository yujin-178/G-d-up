package com.web.gdup.domain.model;

public class UnAuthorizedException extends RuntimeException{
    private static final long serialVersionUID = -2238030302650813813L;

    public  UnAuthorizedException(){
        super("계정 권한이 유호하지 않습니다.\n다시 로그인을 해주세요.");
    }
}
