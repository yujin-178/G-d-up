package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CodyService {

    public List<CodyEntity> getAllCodyList() ;
    public int addCodyItem(CreateCody cc, MultipartFile file)  ;
    public List<CodyEntity> getUserCodyList(String id);
    public int deleteCodyItem(int id);

}
