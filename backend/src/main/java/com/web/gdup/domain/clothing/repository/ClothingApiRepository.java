package com.web.gdup.domain.clothing.repository;

import com.web.gdup.global.component.CommonComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Repository
public class ClothingApiRepository implements ClothingApiRepositoryImpl{
    @Autowired
    CommonComponent commonComponent;

    @Override
    public String getTag(String apiURL, String body) {
        return apiMethod("POST", apiURL, body);
    }

    @Override
    public String getRemoveBg(String apiURL, String body) {
        return apiMethod("POST", apiURL, body);
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
                System.out.println("json 쪼개기");
                byte[] input = json.getBytes("utf-8");
                os.write(input, 0, input.length);
                System.out.println("이게 오래걸리나?");
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                System.out.println("나옴");
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
