package com.web.gdup.domain.cody.service;


import com.web.gdup.domain.cody.dto.ClothingInCody;
import com.web.gdup.domain.cody.dto.CodyDtoAll;
import com.web.gdup.domain.cody.dto.CreateCody;
import com.web.gdup.domain.cody.dto.UpdateCody;
import com.web.gdup.domain.cody_clothing.entity.CodyClothingEntity;
import com.web.gdup.domain.cody.entity.CodyEntity;
import com.web.gdup.domain.cody_hashtag.entity.CodyHashtagEntity;
import com.web.gdup.domain.cody_clothing.repository.CodyClothingRepository;
import com.web.gdup.domain.cody_hashtag.repository.CodyHashtagRepository;
import com.web.gdup.domain.cody.repository.CodyRepository;
import com.web.gdup.domain.hashtag.service.HashtagService;
import com.web.gdup.domain.image.dto.ImageDto;
import com.web.gdup.domain.image.repository.ImageRepository;
import com.web.gdup.domain.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CodyServiceImpl implements CodyService {
    @Autowired
    private CodyRepository codyRepository;

    @Autowired
    private HashtagService hashtagService;

    @Autowired
    private CodyClothingRepository codyClothingRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CodyHashtagRepository codyHashtagRepository;

    @Override
    public List<CodyEntity> getAllCodyList() {

        return codyRepository.findAll();

    }

    @Override
    public List<CodyDtoAll> getUserCodyList(String name) {

        List<CodyEntity> tmp = codyRepository.findAllByUserName(name);
        List<CodyDtoAll> codyAllLists = new ArrayList<>();
        for (CodyEntity a : tmp) {
            List<String> codyTagList = new ArrayList<>();
            List<CodyHashtagEntity> tmp2 = codyHashtagRepository.findAllByCodyId(a.getCodyId());
            for (CodyHashtagEntity b : tmp2) {
                codyTagList.add(b.getTagName());
            }
            CodyDtoAll codyDtoAll = CodyDtoAll.builder()
                    .codyId(a.getCodyId())
                    .codyName(a.getCodyName())
                    .registrationDate(a.getRegistrationDate())
                    .updateDate(a.getUpdateDate())
                    .content(a.getContent())
                    .userName(a.getUserName())
                    .secret(a.getSecret())
                    .imageModel(a.getImageModel())
                    .hashList(codyTagList)
                    .build();
            codyAllLists.add(codyDtoAll);
        }

        return codyAllLists;

    }

    @Override
    public int deleteCodyItem(int id) {
        CodyEntity tmp = codyRepository.getOne(id);

        if (codyRepository.deleteByCodyId(id) == 0)
            return 0;

        int imageId = tmp.getImageModel().getImageId();

        imageRepository.deleteByImageId(imageId);

        return id;
    }

    @Override
    public CodyDtoAll updateCodyItem(UpdateCody uc, MultipartFile file) {
        System.out.println(uc.getCodyId());
        System.out.println(file.getOriginalFilename());
        CodyEntity ce = codyRepository.getOne(uc.getCodyId());

        ImageDto imageDto = updateImage(file, ce.getImageModel().getImageId());
        ImageDto iDto = imageService.getImage(ce.getImageModel().getImageId());

        codyHashtagRepository.deleteByCodyId(ce.getCodyId());

        ce = CodyEntity.builder()
                .codyId(uc.getCodyId())
                .codyName(uc.getCodyName())
                .registrationDate(ce.getRegistrationDate())
                .updateDate(LocalDateTime.now())
                .content(uc.getContent())
                .userName(uc.getUserName())
                .secret(uc.getSecret())
                .imageModel(iDto.toEntity())
                .build();

        codyRepository.save(ce);

        StringTokenizer st = new StringTokenizer(uc.getCodyTag(), " ");
        List<String> tagList = new ArrayList<>();
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hashtagService.findOrCreateHashtag(tagTmp);
            CodyHashtagEntity CHtmp = CodyHashtagEntity.builder()
                    .codyId(ce.getCodyId())
                    .registrationDate(LocalDateTime.now())
                    .tagName(tagTmp).build();
            codyHashtagRepository.save(CHtmp);
            tagList.add(tagTmp);
        }

        codyClothingRepository.deleteByCodyId(ce.getCodyId());


        int len = uc.getClothingList().size();
        List<ClothingInCody> cciList = uc.getClothingList();
        for (int i = 0; i < len; i++) {
            ClothingInCody tmp = cciList.get(i);
            CodyClothingEntity cci = CodyClothingEntity.builder()
                    .codyId(ce.getCodyId())
                    .clothingId(tmp.getClothingId())
                    .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
            // 기존에 없는 새로운 값인지 확인하는 작업이 있어야 하지 않을까?
            codyClothingRepository.save(cci);
        }

        CodyDtoAll codyDtoAll = CodyDtoAll.builder()
                .codyId(ce.getCodyId())
                .codyName(ce.getCodyName())
                .registrationDate(ce.getRegistrationDate())
                .updateDate(ce.getUpdateDate())
                .content(ce.getContent())
                .userName(ce.getUserName())
                .secret(ce.getSecret())
                .imageModel(ce.getImageModel())
                .hashList(tagList)
                .build();

        return codyDtoAll;
    }


    @Override
    public CodyDtoAll addCodyItem(CreateCody createCody, MultipartFile file) throws Exception {
        ImageDto image = saveImage(file);

        int imageId = imageService.insertImage(image);
        CodyEntity inputEntity = createCody.toEntity(imageService.getImage(imageId).toEntity());

//        CodyEntity ans = codyRepository.save(inputEntity);

        Optional<CodyEntity> codyEntity = Optional.of(codyRepository.save(inputEntity));
        codyEntity.orElseThrow(() -> new Exception("null"));

        StringTokenizer st = new StringTokenizer(createCody.getCodyTag(), " ");
        List<String> tagList = new ArrayList<>();
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hashtagService.findOrCreateHashtag(tagTmp);
            CodyHashtagEntity codyHashtagEntity = CodyHashtagEntity.builder()
                    .codyId(codyEntity.get().getCodyId())
                    .registrationDate(LocalDateTime.now())
                    .tagName(tagTmp).build();
            tagList.add(tagTmp);
            codyHashtagRepository.save(codyHashtagEntity);
        }


        int len = createCody.getClothingList().size();
        for (int i = 0; i < len; i++) {
            List<ClothingInCody> cciList = createCody.getClothingList();
            ClothingInCody tmp = cciList.get(i);
            CodyClothingEntity cci = CodyClothingEntity.builder()
                    .codyId(codyEntity.get().getCodyId())
                    .clothingId(tmp.getClothingId())
                    .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
            codyClothingRepository.save(cci);
        }

        CodyDtoAll codyDtoAll = new CodyDtoAll(codyEntity.get(), tagList);

        return codyDtoAll;

    }

    private ImageDto updateImage(MultipartFile file, int imageId) {
        ImageDto imageDto = imageService.getImage(imageId);

        String image_name = imageDto.getNewImageName();

//        String savePath = "C:\\SSAFY\\download";
        String savePath = "/home/ubuntu/backend/download";

        String imagePath = savePath + "/" + image_name;
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
        String[] extension = originImageName.split("\\.");
        String image_name = uuid.toString() + "_" + System.currentTimeMillis() + "." + extension[1];

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


}


