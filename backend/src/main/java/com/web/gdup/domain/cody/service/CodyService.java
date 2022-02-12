package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CodyService {

    public List<CodyEntity> getAllCodyList() ;
    public List<CodyEntity> getUserCodyList(String id);
    public int deleteCodyItem(int id);
    public int addCodyItem(CreateCody cc, MultipartFile file)  ;
    public int updateCodyItem(UpdateCody uc, MultipartFile file);

}