package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.clothing.repository.ClothingRepository;
import com.web.gdup.domain.clothing_hashtag.dto.ClothingHashtagDto;
import com.web.gdup.domain.clothing_hashtag.service.ClothingHashtagServiceImpl;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.service.ImageServiceImpl;
import com.web.gdup.global.component.CommonComponent;
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
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;

@Service
public class ClothingService implements ClothingServiceImpl{
    @Autowired
    private ClothingRepository clothingRepository;
    @Autowired
    CommonComponent commonComponent;
    @Autowired
    ImageServiceImpl imageService;
    @Autowired
    ClothingHashtagServiceImpl clothingHashtagService;

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
        return apiMethod("POST", apiURL, body);
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

        String result = apiMethod("POST", apiURL, body);
        String imageURL = urlParser(result);
        download(imageURL);
        return imageURL;
    }

    @Override
    @Transactional
    public int insertClothing(MultipartFile file, ClothingDto clothing, String hashtag) {
        ImageDto image = saveImage(file);
        int imageId = imageService.insertImage(image);
        ImageDto iDto = imageService.getImage(imageId);

        clothing.setImageModel(iDto.toEntity());
        int clothing_id = clothingRepository.save(clothing.toEntity()).getClothingId();
        Set<String> hashtags = parseHashtags(hashtag);

        clothingHashtagService.insertHashtags(clothing_id, hashtags);
        return clothing_id;
    }

    private Set<String> parseHashtags(String hashtag) {
        Set<String> set = new HashSet<>();
        StringTokenizer st = new StringTokenizer(hashtag);
        while(st.hasMoreTokens()) {
            set.add(st.nextToken());
        }
        return set;
    }

    @Override
    @Transactional
    public HashMap<String, Object> getClothing(int clothingId) {
        ClothingEntity clothing = clothingRepository.findById(clothingId).get();
        ClothingDto clothingDto = buildClothingDto(clothing);

        List<ClothingHashtagDto> hashtags = clothingHashtagService.getHashtags(clothingId);
        HashMap<String, Object> map = new HashMap<>();
        map.put("clothing", clothing);
        map.put("hashtag", hashtags);
        return map;
    }

    @Override
    public Optional<ClothingEntity> deleteClothing(int clothingId) {
        ClothingEntity clothing = clothingRepository.getOne(clothingId);
        String removeUrl = clothing.getImageModel().getImagePath();

        File file = new File(removeUrl);
        if(file.exists()) {
            if(file.delete()) {
                clothingRepository.deleteById(clothingId);
                System.out.println("삭제 완료");
            }
            else
                System.out.println("삭제 실패");
        } else {
            System.out.println("파일이 존재하지 않습니다.");
        }

        Optional<ClothingEntity> deleteClothing = clothingRepository.findById(clothingId);
        return deleteClothing;
    }

    @Override
    public List<HashMap<String, Object>> getUserClothing(String userName) {
        List<HashMap<String, Object>> result = new ArrayList<>();
        HashMap<String, Object> map = new HashMap<>();

        List<ClothingEntity> list = clothingRepository.findByUserName(userName);
        for(ClothingEntity cd : list) {
            ClothingDto clothingDto = buildClothingDto(cd);

            map.put("clothing", clothingDto);
            map.put("hashtag", clothingHashtagService.getHashtags(cd.getClothingId()));
            result.add(map);
        }
        return result;
    }

    private String urlParser(String str) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray jArray = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) jArray.get(0);
        String whitebgUrl = (String) obj.get("_output_url_whitebg");
        return whitebgUrl;
    }

    private ClothingDto buildClothingDto(ClothingEntity clothing) {
        ClothingDto clothingDto = ClothingDto.builder()
                .age(clothing.getAge())
                .color(clothing.getColor())
                .clothingId(clothing.getClothingId())
                .cut(clothing.getCut())
                .design(clothing.getDesign())
                .gender(clothing.getGender())
                .hood(clothing.getHood())
                .layers(clothing.getLayers())
                .length(clothing.getLength())
                .material(clothing.getMaterial())
                .neckline(clothing.getNeckline())
                .pattern(clothing.getPattern())
                .season(clothing.getSeason())
                .sleeves(clothing.getSleeves())
                .style(clothing.getStyle())
                .subcategory(clothing.getSubcategory())
                .userName(clothing.getUserName())
                .imageModel(clothing.getImageModel())
                .registrationDate(clothing.getRegistrationDate())
                .build();
        return clothingDto;
    }

    private ImageDto saveImage(MultipartFile file) {
        UUID uuid = UUID.randomUUID();

        String originImageName = file.getOriginalFilename();
        String image_name = uuid.toString()+"_"+originImageName;

        String savePath = "C:\\SSAFY\\download";

        String imagePath = savePath + "\\" + image_name;
        try {
            file.transferTo(new File(imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        ImageDto image = ImageDto.builder()
                .imageName(originImageName)
                .newImageName(image_name)
                .imagePath(imagePath)
                .build();
        return image;
    }

    private void download(String spec) {
        String outputDir = "C:\\SSAFY\\removeBg";
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

    private String apiMethod(String type, String apiUrl, String json) {
        System.out.println("들어가기 전");
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Content-type", "application/json");
        requestHeaders.put("Authorization", commonComponent.getConfig().getApiKey());
        requestHeaders.put("Accept", "application/json");

        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod(type);
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }
            con.setDoOutput(true);

            try (OutputStream os = con.getOutputStream()) {
                byte[] input = json.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 에러 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);
        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();
            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }
            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
