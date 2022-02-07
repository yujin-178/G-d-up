package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CodyServiceImpl implements CodyService {
    @Autowired
    private CodyRepository cr;

    @Override
    public List<CodyDto> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyDto> getUserCodyList(String id){
        return cr.findAllByUserName(id);
    }
    public boolean addCodyItem(CodyDto codyDto, MultipartFile image) throws IOException, ParseException {

        return true;
    }



    public String urlParser(String str) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray jArray = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) jArray.get(0);
        String whitebgUrl = (String) obj.get("_output_url_whitebg");
        return whitebgUrl;
    }

}
