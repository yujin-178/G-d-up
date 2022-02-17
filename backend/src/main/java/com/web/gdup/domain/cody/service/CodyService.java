package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CodyDtoAll;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface CodyService {

    public List<CodyEntity> getAllCodyList();

    public List<CodyDtoAll> getUserCodyList(String id) throws Exception;

    public int deleteCodyItem(int id) throws Exception;

    public CodyDtoAll addCodyItem(CreateCody cc, MultipartFile file) throws Exception;

    public CodyDtoAll updateCodyItem(UpdateCody uc, MultipartFile file) throws Exception;

    public CodyDtoAll updateCodyItemId(UpdateCody updateCody) throws Exception;
}