package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyDto;

import java.util.List;


public interface CodyService {

    public List<CodyDto> getAllCodyList() ;
    public int addCodyItem(CreateCody cc, String userName)  ;
    public List<CodyDto> getUserCodyList(String id);
    public int deleteCodyItem(int id);

}
