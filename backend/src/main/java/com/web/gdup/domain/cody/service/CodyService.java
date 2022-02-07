package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CodyDto;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface CodyService {

    public List<CodyDto> getAllCodyList() ;
    public boolean addCodyItem(CodyDto codyDto, MultipartFile image) throws IOException, ParseException ;
    public List<CodyDto> getUserCodyList(String id);

}