package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class CodyService {
    @Autowired
    CodyRepository cr;

    public List<CodyDto> getCodyListAll() {
        return cr.findAll();
    }

    public boolean addCodyItem(Map<String, Object> codyInfo, MultipartFile image) throws IOException, ParseException {
        System.out.println("Post 실행");
        System.out.println("Map Info --------------------------------");

        for (String key : codyInfo.keySet()) {
            System.out.println("key : " + key);
            System.out.println("val : " + codyInfo.get(key));
            System.out.println(urlParser(urlParser((String)codyInfo.get(key))));
        }

        System.out.println();
        System.out.println("파일 정보 --------------------------------");
        System.out.println("사진 이름 : " + image.getOriginalFilename());
        System.out.println("사진 크기 : " + image.getSize());



        System.out.println("POST 종료");
        return true;
    }

    private String urlParser(String str) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray jArray = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) jArray.get(0);
        String whitebgUrl = (String) obj.get("_output_url_whitebg");
        return whitebgUrl;
    }

}
