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
    public List<CodyDtoAll> getUserCodyList(String name) throws Exception {

        List<CodyEntity> codyEntities = codyRepository.findAllByUserName(name);
        List<CodyDtoAll> codyDtoAlls = new ArrayList<>();
        if(codyDtoAlls.size() == 0)
            throw new Exception("null");

        for (CodyEntity codyEntity : codyEntities) {
            List<String> codyTagList = new ArrayList<>();
            List<CodyHashtagEntity> codyHashtagEntities = codyHashtagRepository.findAllByCodyId(codyEntity.getCodyId());
            for (CodyHashtagEntity codyHashtagEntity : codyHashtagEntities) {
                codyTagList.add(codyHashtagEntity.getTagName());
            }
            codyDtoAlls.add(new CodyDtoAll(codyEntity, codyTagList));
        }
        return codyDtoAlls;
    }

    @Override
    public int deleteCodyItem(int id) throws Exception {

        codyRepository.deleteById(id);

        return id;
    }

    @Override
    public CodyDtoAll updateCodyItem(UpdateCody updateCody, MultipartFile file) throws Exception {
        CodyEntity codyEntity = codyRepository.getOne(updateCody.getCodyId());

        ImageDto imageDto = updateImage(file, codyEntity.getImageModel().getImageId());

        codyHashtagRepository.deleteByCodyId(codyEntity.getCodyId());

        Optional<CodyEntity> codyEntityOptional = Optional.of(codyRepository.save(updateCody.toEntity(imageDto.toEntity())));
        codyEntityOptional.orElseThrow(() -> new Exception("null"));


        StringTokenizer st = new StringTokenizer(updateCody.getCodyTag(), " ");
        List<String> tagList = new ArrayList<>();
        while (st.hasMoreTokens()) {
            String tagTmp = st.nextToken();
            hashtagService.findOrCreateHashtag(tagTmp);
            CodyHashtagEntity codyHashtagEntity = CodyHashtagEntity.builder()
                    .codyId(codyEntityOptional.get().getCodyId())
                    .registrationDate(LocalDateTime.now())
                    .tagName(tagTmp).build();
            codyHashtagRepository.save(codyHashtagEntity);
            tagList.add(tagTmp);
        }

        codyClothingRepository.deleteByCodyId(codyEntityOptional.get().getCodyId());

        int len = updateCody.getClothingList().size();
        List<ClothingInCody> cciList = updateCody.getClothingList();
        for (int i = 0; i < len; i++) {
            ClothingInCody tmp = cciList.get(i);
            CodyClothingEntity cci = CodyClothingEntity.builder()
                    .codyId(codyEntityOptional.get().getCodyId())
                    .clothingId(tmp.getClothingId())
                    .m(tmp.getM()).x(tmp.getX()).y(tmp.getY()).z(tmp.getZ()).build();
            codyClothingRepository.save(cci);
        }

        CodyDtoAll codyDtoAll = new CodyDtoAll(codyEntityOptional.get(), tagList);

        return codyDtoAll;
    }


    @Override
    public CodyDtoAll addCodyItem(CreateCody createCody, MultipartFile file) throws Exception {
        ImageDto image = saveImage(file);

        int imageId = imageService.insertImage(image);
        CodyEntity inputEntity = createCody.toEntity(imageService.getImage(imageId).toEntity());

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


