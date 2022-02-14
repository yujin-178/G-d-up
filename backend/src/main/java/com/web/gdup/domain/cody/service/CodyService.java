package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CodyAllList;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.CreateCodyResponse;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CodyService {

    public List<CodyEntity> getAllCodyList() ;
    public List<CodyAllList> getUserCodyList(String id);
    public int deleteCodyItem(int id);
    public CreateCodyResponse addCodyItem(CreateCody cc, MultipartFile file)  ;
    public int updateCodyItem(UpdateCody uc, MultipartFile file);

}