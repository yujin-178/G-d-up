package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.ClothingInCody;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody.entity.CodyClothingEntity;
import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import com.web.gdup.domain.cody.repository.CodyClothingRepository;
import com.web.gdup.domain.cody.repository.CodyHashtagRepository;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.hashtag.service.HashtagService;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.repository.ImageRepository;
import com.web.gdup.domain.image.service.ImageService;
import com.web.gdup.domain.image.service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private ImageService imageService;

    @Autowired
    private CodyHashtagRepository chr;

    @Autowired
    private ImageRepository ir;

    @Override
    public List<CodyEntity> getAllCodyList() {
        return cr.findAll();
    }

    @Override
    public List<CodyEntity> getUserCodyList(String name) {
        return cr.findAllByUserName(name);
    }

    @Override
    public int deleteCodyItem(int id) {
        CodyEntity tmp = cr.getOne(id);

        if (cr.deleteByCodyId(id) == 0)
            return 0;

        int imageId = tmp.getImageId();

        if (ir.deleteByImageId(imageId) == 0)
            return 0;

        return 1;
    }

    @Override
    public int updateCodyItem(UpdateCody uc, MultipartFile file) {
        System.out.println(uc.getCodyId());
        System.out.println(file.getOriginalFilename());
        CodyEntity ce = cr.getOne(uc.getCodyId());

        ImageDto imageDto = updateImage(file, ce.getImageId());


        chr.deleteByCodyId(ce.getCodyId());

        ce = CodyEntity.builder()
                .codyId(uc.getCodyId())
                .codyName(uc.getCodyName())
                .registrationDate(ce.getRegistrationDate())
                .updateDate(LocalDateTime.now())
                .content(uc.getContent())
                .userName(uc.getUserName())
                .secret(uc.getSecret())
                .imageId(ce.getImageId())
                .build();

        cr.save(ce);

        StringTokenizer st = new StringTokenizer(uc.getCodyTag(), " ");
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hs.findOrCreateHashtag(tagTmp);
            CodyHashtagEntity CHtmp = CodyHashtagEntity.builder()
                    .codyId(ce.getCodyId())
                    .registrationDate(LocalDateTime.now())
                    .tagName(tagTmp).build();
            chr.save(CHtmp);
        }

        ccr.deleteByCodyId(ce.getCodyId());


        int len = uc.getClothingList().size();
        List<ClothingInCody> cciList = uc.getClothingList();
        for (int i = 0; i < len; i++) {
            ClothingInCody tmp = cciList.get(i);
            CodyClothingEntity cci = CodyClothingEntity.builder()
                    .codyId(ce.getCodyId())
                    .clothingId(tmp.getClothingId())
                    .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
            // 기존에 없는 새로운 값인지 확인하는 작업이 있어야 하지 않을까?
            ccr.save(cci);
        }


        return 1;
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
                .imageId(imageId)
                .build();


        CodyEntity ans = cr.save(codyDto);

        StringTokenizer st = new StringTokenizer(cc.getCodyTag(), " ");
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hs.findOrCreateHashtag(tagTmp);
            System.out.println(LocalDateTime.now());
            CodyHashtagEntity CHtmp = CodyHashtagEntity.builder()
                    .codyId(ans.getCodyId())
                    .registrationDate(LocalDateTime.now())
                    .tagName(tagTmp).build();
            chr.save(CHtmp);
        }


        if (ans != null) {
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

    private ImageDto updateImage(MultipartFile file, int imageId) {
        ImageDto imageDto = imageService.getImage(imageId);

        String originImageName = file.getOriginalFilename();
        String image_name = imageDto.getNewImageName();

        String savePath = "C:\\SSAFY\\download";

        String imagePath = savePath + "\\" + image_name;
        try {
            file.transferTo(new File(imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }


        return imageDto;
    }

    private ImageDto saveImage(MultipartFile file) {
        UUID uuid = UUID.randomUUID();

        String originImageName = file.getOriginalFilename();
        String image_name = uuid.toString() + "_" + originImageName;

        String savePath = "C:\\SSAFY\\download";
//        String savePath = /home/ubuntu/backend/download;

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



