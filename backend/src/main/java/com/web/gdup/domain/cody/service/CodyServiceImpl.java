package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.ClothingInCody;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyClothingInfo;
import com.web.gdup.domain.cody.entity.CodyClothingPK;
import com.web.gdup.domain.cody.entity.CodyDto;
import com.web.gdup.domain.cody.repository.CodyClothingRepository;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.hashtag.dto.HashtagDto;
import com.web.gdup.domain.hashtag.repository.HashtagRepository;
import com.web.gdup.domain.hashtag.service.HashtagService;
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

    @Autowired
    private HashtagRepository hr;

    @Autowired
    private HashtagService hs;

    @Autowired
    private CodyClothingRepository ccr;

    @Override
    public List<CodyDto> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyDto> getUserCodyList(String id) {
        return cr.findAllByUserName(id);
    }

    @Override
    public int deleteCodyItem(int id) {
        return cr.deleteByCodyId(id);
    }

    @Override
    public int addCodyItem(CreateCody cc, String userName) {
        StringTokenizer st = new StringTokenizer(cc.getCodyTag(), ", ");

        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            if(!tagTmp.equals(hr.getOne(tagTmp).getTagName()) ) {
                HashtagDto hash = HashtagDto.builder().tagName("#" + tagTmp).build();
//                System.out.println("hash : " + hash.toString());
                hs.insertHashtag(hash);
            }

        }


        CodyDto codyDto = CodyDto.builder()
                .userName(userName)
                .content(cc.getContent())
                .codyName(cc.getCodyName())
                .secret(cc.getSecret())
                .updateDate(LocalDateTime.now())
                .registrationDate(LocalDateTime.now()).build();

        CodyDto ans = cr.save(codyDto);

        if (ans != null) {
            System.out.println("Cody 생성 성공");
            int len = cc.getClothingList().size();
            List<ClothingInCody> cciList = cc.getClothingList();
            for (int i = 0; i < len; i++) {
                ClothingInCody tmp = cciList.get(i);
                CodyClothingInfo cci = CodyClothingInfo.builder()
                        .codyId(ans.getCodyId())
                        .clothingId(tmp.getClothingId())
                        .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
                // 기존에 없는 새로운 값인지 확인하는 작업이 있어야 하지 않을까?
//                System.out.println("tmp : " +tmp.toString());
                ccr.save(cci);

            }


            return 1;
        } else {
            System.out.println("Cody 생성 실패");
            return 0;
        }
    }
}



