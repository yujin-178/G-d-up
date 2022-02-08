package com.web.gdup.domain.cody.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;
import java.io.Serializable;

@Getter
@ToString
public class CodyHashPK implements Serializable {
    @Column(name = "tagname")
    private String tagName;
    @Column(name = "codyid")
    private int codyId;
}
