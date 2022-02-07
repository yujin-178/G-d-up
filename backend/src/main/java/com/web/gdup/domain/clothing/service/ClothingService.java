package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.clothing.repository.ClothingApiRepositoryImpl;
import com.web.gdup.domain.clothing.repository.ClothingRepository;
import com.web.gdup.domain.image.dto.ImageModel;
import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
public class ClothingService implements ClothingServiceImpl{
    @Autowired
    private ClothingRepository clothingRepository;
    @Autowired
    private ClothingApiRepositoryImpl clothingApiRepository;

    @Override
    public String getTag(MultipartFile file) throws IOException {
        System.out.println("이미지 처리");
        String apiURL = "https://api.ximilar.com/tagging/fashion/v2/detect_tags";

        String strBase64 = "";
        if (file != null) {
            strBase64 = new String(Base64.encodeBase64(file.getBytes()));
        }

        HashMap<String, Object> base = new HashMap<>();
        base.put("_base64", strBase64);
        JSONArray jArray = new JSONArray();
        jArray.add(base);

        HashMap<String, Object> record = new HashMap<>();
        record.put("records", jArray);
        JSONObject data = new JSONObject(record);
        String body = data.toString();
        System.out.println("json 완료");
        return clothingApiRepository.getTag(apiURL, body);
    }

    @Override
    public String getRemoveBg(MultipartFile file) throws IOException, ParseException {
        String apiURL = "https://api.ximilar.com/removebg/precise/removebg";

        String strBase64 = "";
        if (file != null) {
            strBase64 = new String(Base64.encodeBase64(file.getBytes()));
        }

        HashMap<String, Object> info = new HashMap<>();
        info.put("_base64", strBase64);
        info.put("binary_mask", false);
        info.put("white_background", true);
        JSONArray jArray = new JSONArray();
        jArray.add(info);

        HashMap<String, Object> record = new HashMap<>();
        record.put("records", jArray);
        JSONObject data = new JSONObject(record);
        String body = data.toString();

        String result = clothingApiRepository.getRemoveBg(apiURL, body);
        String imageURL = urlParser(result);
        download(imageURL);
        return imageURL;
    }

    @Override
    @Transactional
    public int insertClothing(ClothingDto clothingDto, ImageModel image) {
        ClothingEntity clothing = clothingDto.toEntity();
        clothing.mapImage(image);
        return clothingRepository.save(clothing).getClothing_id();
    }

    @Override
    @Transactional
    public ClothingDto getClothing(int id) {
        ClothingEntity clothing = clothingRepository.findById(id).get();

        ClothingDto clothingDto = ClothingDto.builder()
                .clothing_id(clothing.getClothing_id())
                .age(clothing.getAge())
                .color(clothing.getColor())
                .cut(clothing.getCut())
                .pattern(clothing.getPattern())
                .design(clothing.getDesign())
                .gender(clothing.getGender())
                .hood(clothing.getHood())
                .imageModel(clothing.getImageModel())
//                .image_id(clothing.getImage_id())
                .layers(clothing.getLayers())
                .length(clothing.getLength())
                .material(clothing.getMaterial())
                .neckline(clothing.getNeckline())
                .registration_date(clothing.getRegistration_date())
                .season(clothing.getSeason())
                .sleeves(clothing.getSleeves())
                .style(clothing.getStyle())
                .subcategory(clothing.getSubcategory())
                .user_name(clothing.getUser_name())
                .build();
        return clothingDto;
    }

    @Override
    public void deleteClothing(int clothing_id) {
        clothingRepository.deleteById(clothing_id);
    }

    private String urlParser(String str) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray jArray = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) jArray.get(0);
        String whitebgUrl = (String) obj.get("_output_url_whitebg");
        return whitebgUrl;
    }

    private static void download(String spec) {
        String outputDir = "C:\\SSAFY\\download";
        InputStream is = null;
        FileOutputStream os = null;
        try {
            URL url = new URL(spec);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            int responseCode = conn.getResponseCode();

            System.out.println("responseCode " + responseCode);

            // Status 가 200 일 때
            if (responseCode == HttpURLConnection.HTTP_OK) {
                String fileName = "";
                String disposition = conn.getHeaderField("Content-Disposition");
                String contentType = conn.getContentType();

                // 일반적으로 Content-Disposition 헤더에 있지만
                // 없을 경우 url 에서 추출해 내면 된다.
                if (disposition != null) {
                    String target = "filename=";
                    int index = disposition.indexOf(target);
                    if (index != -1) {
                        fileName = disposition.substring(index + target.length() + 1);
                    }
                } else {
                    fileName = spec.substring(spec.lastIndexOf("/") + 1);
                }

                System.out.println("Content-Type = " + contentType);
                System.out.println("Content-Disposition = " + disposition);
                System.out.println("fileName = " + fileName);

                is = conn.getInputStream();
                os = new FileOutputStream(new File(outputDir, fileName));

                final int BUFFER_SIZE = 4096;
                int bytesRead;
                byte[] buffer = new byte[BUFFER_SIZE];
                while ((bytesRead = is.read(buffer)) != -1) {
                    os.write(buffer, 0, bytesRead);
                }
                os.close();
                is.close();
                System.out.println("File downloaded");
            } else {
                System.out.println("No file to download. Server replied HTTP code: " + responseCode);
            }
            conn.disconnect();
        } catch (Exception e) {
            System.out.println("An error occurred while trying to download a file.");
            e.printStackTrace();
            try {
                if (is != null) {
                    is.close();
                }
                if (os != null) {
                    os.close();
                }
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        }
    }
}
