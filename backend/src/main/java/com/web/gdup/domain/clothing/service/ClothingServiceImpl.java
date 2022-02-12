package com.web.gdup.domain.clothing.service;

import com.web.gdup.domain.clothing.dto.ClothingDto;
import com.web.gdup.domain.clothing.dto.ClothingResponse;
import com.web.gdup.domain.clothing.entity.ClothingEntity;
import com.web.gdup.domain.clothing.repository.ClothingRepository;
import com.web.gdup.domain.clothing_hashtag.service.ClothingHashtagService;
import com.web.gdup.domain.clothing_washing.dto.ClothingWashingDto;
import com.web.gdup.domain.clothing_washing.service.ClothingWashingService;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.service.ImageService;
import com.web.gdup.global.component.CommonComponent;
import com.web.gdup.global.component.EcoMatching;
import com.web.gdup.global.component.TranslationEng;
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
public class ClothingServiceImpl implements ClothingService{
    @Autowired
    private ClothingRepository clothingRepository;
    @Autowired
    CommonComponent commonComponent;
    @Autowired
    ImageService imageService;
    @Autowired
    ClothingHashtagService clothingHashtagService;
    @Autowired
    ClothingWashingService clothingWashingService;

    private TranslationEng te = new TranslationEng();
    private HashMap<String, HashMap<String, String>> map = te.getTranslationEng();

    @Override
    public HashMap<String, String> getTag(MultipartFile file) throws IOException {
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
        String jsonData = apiMethod("POST", apiURL, body);
        HashMap<String, String> result = null;
        try {
            result = columnParser(jsonData);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
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
    public int insertClothing(MultipartFile file, ClothingDto clothing, String hashtag, String washing) {
        ImageDto image = saveImage(file);
        int imageId = imageService.insertImage(image);
        ImageDto iDto = imageService.getImage(imageId);
        clothing.setImageModel(iDto.toEntity());

        if(clothing.getMaterial()!=null) {
            EcoMatching ecoMatch = new EcoMatching();
            HashMap<String, String> eco = ecoMatch.setEcoMatching();
            clothing.setEco(eco.get(clothing.getMaterial()));
        }

        int clothing_id = clothingRepository.save(clothing.toEntity()).getClothingId();
        Set<String> hashtags = parseHashtags(hashtag);
        clothingHashtagService.insertHashtags(clothing_id, hashtags);

        String[] str = washing.split(" ");
        clothingWashingService.insertClothingWashing(clothing_id, str);

        return clothing_id;
    }

    @Override
    @Transactional
    public HashMap<String, Object> getClothing(int clothingId) {
        ClothingEntity clothing = clothingRepository.findById(clothingId).get();
        ClothingDto clothingDto = buildClothingDto(clothing);

        List<String> hashtags = clothingHashtagService.getHashtags(clothingId);
        List<ClothingWashingDto> washing = clothingWashingService.getWashingMethods(clothingId);
        HashMap<String, Object> map = new HashMap<>();
        map.put("clothing", clothing);
        map.put("hashtag", hashtags);
        map.put("washing", washing);
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

        List<ClothingEntity> list = clothingRepository.findAllByUserName(userName);
        for(ClothingEntity cd : list) {
            ClothingDto clothingDto = buildClothingDto(cd);
            HashMap<String, Object> map = new HashMap<>();
            map.put("clothing", clothingDto);
            map.put("hashtag", clothingHashtagService.getHashtags(cd.getClothingId()));
            map.put("washing", clothingWashingService.getWashingMethods(cd.getClothingId()));
            result.add(map);
        }
        return result;
    }

    private Set<String> parseHashtags(String hashtag) {
        Set<String> set = new HashSet<>();
        StringTokenizer st = new StringTokenizer(hashtag);
        while(st.hasMoreTokens()) {
            set.add(st.nextToken());
        }
        return set;
    }

    private HashMap<String, String> columnParser(String str) throws ParseException {
        String[] clothingResponse = {"category", "topcategory", "age", "color", "cut", "design", "gender", "hood", "layers", "material", "neckline", "pattern", "sleeves", "style", "subcategory", "season", "fit"};

        HashMap<String, String> result = new HashMap<>();
        for(String cr : clothingResponse) {
            result.put(cr, null);
        }

        ClothingResponse cResponse = new ClothingResponse();

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray records = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) records.get(0);
        JSONArray objects = (JSONArray) obj.get("_objects");
        JSONObject object = (JSONObject) objects.get(0);
        JSONObject tags = (JSONObject) object.get("_tags");

        for(Object tag:tags.keySet()){
            JSONArray tagArray = (JSONArray) tags.get(tag);
            JSONObject name = (JSONObject) tagArray.get(0);
            String tagName = tag.toString().toLowerCase();
            result.put(tagName, map.get(tag).get(name.get("name")));
        }
        return result;
    }

    private String urlParser(String str) throws IOException, ParseException {
        JSONParser parser = new JSONParser();
        JSONObject jsonObject = (JSONObject) parser.parse(str);
        JSONArray jArray = (JSONArray) jsonObject.get("records");
        JSONObject obj = (JSONObject) jArray.get(0);
        String whitebgUrl = (String) obj.get("_output_url");
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
                .category(clothing.getCategory())
                .topcategory(clothing.getTopcategory())
                .fit(clothing.getFit())
                .eco(clothing.getEco())
                .build();
        return clothingDto;
    }

    private ImageDto saveImage(MultipartFile file) {
        UUID uuid = UUID.randomUUID();

        String originImageName = file.getOriginalFilename();
        System.out.println(originImageName);

        String[] extension = originImageName.split("\\.");
        System.out.println(extension[0]);
        String image_name = uuid.toString()+"_"+System.currentTimeMillis()+"."+extension[1];

        String image_url = "";
//        String savePath = "C:\\SSAFY\\download";
        String savePath = "/home/ubuntu/backend/download";
        String imagePath = savePath + "/" + image_name;

        try {
            file.transferTo(new File(imagePath));
            image_url = "http://i6b108.p.ssafy.io:8000/images/" + image_name;
        } catch (IOException e) {
            e.printStackTrace();
        }

        ImageDto image = ImageDto.builder()
                .imageUrl(image_url)
                .newImageName(image_name)
                .imagePath(imagePath)
                .build();
        return image;
    }

    private void download(String spec) {
//        String outputDir = "/home/ubuntu/backend/removeBg";
        String outputDir = "/home/ubuntu/backend/removeBg";
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
