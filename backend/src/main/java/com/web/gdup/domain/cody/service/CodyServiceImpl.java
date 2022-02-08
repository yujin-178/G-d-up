package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.ClothingInCody;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.entity.CodyClothingEntity;
import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import com.web.gdup.domain.cody.repository.CodyClothingRepository;
import com.web.gdup.domain.cody.repository.CodyHashtagRepository;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.hashtag.service.HashtagService;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

@Service
public class CodyServiceImpl implements CodyService {
    @Autowired
    private CodyRepository cr;

    @Autowired
    private HashtagService hs;

    @Autowired
    private CodyClothingRepository ccr;

    @Autowired
    private ImageServiceImpl imageService;

    @Autowired
    private CodyHashtagRepository chr;

    @Override
    public List<CodyEntity> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyEntity> getUserCodyList(String id) {
        return cr.findAllByUserName(id);
    }

    @Override
    public int deleteCodyItem(int id) {
        return cr.deleteByCodyId(id);
    }

    @Override
    public int addCodyItem(CreateCody cc, MultipartFile file) {
        ImageDto image = saveImage(file);

        int imageId = imageService.insertImage(image);


        CodyEntity codyDto = CodyEntity.builder()
                .userName(cc.getUserName())
                .content(cc.getContent())
                .codyName(cc.getCodyName())
                .secret(cc.getSecret())
                .updateDate(LocalDateTime.now())
                .registrationDate(LocalDateTime.now())
                .imageModel(imageId)
                .build();


        CodyEntity ans = cr.save(codyDto);

        StringTokenizer st = new StringTokenizer(cc.getCodyTag(), " ");
        System.out.println(cc.getCodyTag());
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hs.findOrCreateHashtag(tagTmp);
            CodyHashtagEntity CHtmp = CodyHashtagEntity.builder()
                    .codyId(ans.getCodyId())
                    .tagName(tagTmp).build();
            chr.save(CHtmp);
        }


        if (ans != null) {
            System.out.println("Cody 생성 성공");
            int len = cc.getClothingList().size();
            List<ClothingInCody> cciList = cc.getClothingList();
            for (int i = 0; i < len; i++) {
                ClothingInCody tmp = cciList.get(i);
                CodyClothingEntity cci = CodyClothingEntity.builder()
                        .codyId(ans.getCodyId())
                        .clothingId(tmp.getClothingId())
                        .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
                // 기존에 없는 새로운 값인지 확인하는 작업이 있어야 하지 않을까?
                ccr.save(cci);

            }


            return 1;
        } else {
            System.out.println("Cody 생성 실패");
            return 0;
        }
    }


    private ImageDto saveImage(MultipartFile file) {
        UUID uuid = UUID.randomUUID();

        String originImageName = file.getOriginalFilename();
        String image_name = uuid.toString() + "_" + originImageName;

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
}



