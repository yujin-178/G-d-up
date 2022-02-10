package com.web.gdup.domain.wordcloud.service;

import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import com.web.gdup.domain.cody.repository.CodyHashtagRepository;
import com.web.gdup.domain.wordcloud.dto.wordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class wordService {
    @Autowired
    private CodyHashtagRepository chr;

    public List<Object[]> getList(){
        return chr.getlist();
    }
}
