package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.ClothingInCody;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyClothingInfo;
import com.web.gdup.domain.cody.entity.CodyDto;
import com.web.gdup.domain.cody.repository.CodyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Service
public class CodyServiceImpl implements CodyService {
    @Autowired
    private CodyRepository cr;

    @Override
    public List<CodyDto> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyDto> getUserCodyList(String id) {
        return cr.findAllByUserName(id);
    }

    @Override
    public int deleteCodyItem(String id) {
        return cr.deleteByCodyId(id);
    }

    @Override
    public int addCodyItem(CreateCody cc, String userName) {
        StringTokenizer st = new StringTokenizer(cc.getCodyTag(), ", ");
        List<String> codyTag = new ArrayList<>();
        while(st.hasMoreTokens()){
            // 해당 해쉬 태크가 존재하는지 확인하는 find 필요
            codyTag.add(st.nextToken());
        }

        CodyDto codyDto = CodyDto.builder()
                .userName(userName)
                .content(cc.getContent())
                .codyName(cc.getCodyName())
                .secret(cc.getSecret())
                .updateDate(LocalDateTime.now())
                .registrationDate(LocalDateTime.now()).build();

        CodyDto ans = cr.save(codyDto);

        if(ans != null) {
            System.out.println("Cody 생성 성공");
            int len = cc.getClothingList().size();
            List<ClothingInCody> cciList = cc.getClothingList();
            for(int i = 0; i< len;i++){
                ClothingInCody tmp = cciList.get(i);
                CodyClothingInfo cci = CodyClothingInfo.builder()
                        .codyId(ans.getCodyId())
                        .clothingId(tmp.getClothingId())
                        .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();


            }


            return 1;
        }
        else {
            System.out.println("Cody 생성 실패");
            return 0;
        }
    }
}



