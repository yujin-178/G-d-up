package com.web.gdup.domain.cody.controller;

import com.web.gdup.domain.cody.dto.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.cody.service.CodyService;
import io.swagger.annotations.ApiOperation;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://i6b108.p.ssafy.io:3000"})
@RestController("/cody")
public class CodyController {

    @Autowired
    CodyService cs;

    @Autowired
    CodyRepository cr;

    @GetMapping(value = "/testHello")
    @ApiOperation(
            value ="코디 동작 확인",
            notes = "요청하는 경우 Hello 문자열을 반환한다."
    )
    public ResponseEntity<String> testHello(){
        return new ResponseEntity<String>("Hello", HttpStatus.OK);
    }


//    @PostMapping(value = "/addCodyInfo", produces = "application/json; charset=urf8")
//    @ApiOperation(
//            value = "코디 정보만 추가",
//            notes = "코디의 정보만 받아서 새로운 코디를 만든다.")
//    public ResponseEntity<String> addCody(@RequestBody String codyInfo) throws Exception{
//        for (String key : codyInfo.keySet()) {
//            System.out.println("key : " + key);
//            System.out.println("val : " + codyInfo.get(key));
//        }
//
//        ResponseEntity<String> re = new ResponseEntity<>("Cody 정보 수신 성공", HttpStatus.OK);
//        return re;
//    }

    @PostMapping(value = "/addImageAndCodyInfo", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @ApiOperation(
            value = "코디 추가",
            notes = "코디의 사진, 태크 정보를 받아서 새로운 코디를 만든다.")
    public ResponseEntity<String> addCody(@RequestParam String cody_name,@RequestParam String content,@RequestParam int secret,@RequestParam String user_name, @RequestParam MultipartFile image, @RequestParam String[] cody_tag) throws IOException, ParseException {
        System.out.println(cody_name);
        System.out.println(content);
        System.out.println(secret);
        System.out.println(user_name);
        System.out.println(cody_tag[0]);
        System.out.println(cody_tag[1]);
//        System.out.println(cody_tag[2]);
        CodyDto tmp = CodyDto.builder()
                .cody_name(cody_name)
                .secret(0)
                .content(content)
                .user_name(user_name)
                .registration_date(LocalDateTime.now())
                .update_date(LocalDateTime.now())
                .image_id(1).build();

        System.out.println(tmp.toString());
        cr.save(tmp);


        ResponseEntity<String> re = new ResponseEntity<>("Cody 정보 수신 성공", HttpStatus.OK);
        return re;
    }

    @GetMapping(value = "/list")
    @ApiOperation(
            value = "listCody",
            notes = "사용자의 모든 코디 정보를 불러온다.")
    public ResponseEntity<List<CodyDto>> listCody() {
        return new ResponseEntity<List<CodyDto>>(cs.getCodyListAll(), HttpStatus.OK);
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
