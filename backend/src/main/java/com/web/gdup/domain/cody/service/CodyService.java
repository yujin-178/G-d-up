package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.*;
import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CodyService {

    public List<CodyEntity> getAllCodyList() ;
    public List<CodyDtoAll> getUserCodyList(String id);
    public int deleteCodyItem(int id);
    public CodyDtoAll addCodyItem(CreateCody cc, MultipartFile file)  ;
    public CodyDtoAll updateCodyItem(UpdateCody uc, MultipartFile file);

}