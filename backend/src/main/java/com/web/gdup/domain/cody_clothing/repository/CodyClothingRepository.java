package com.web.gdup.domain.cody_clothing.repository;

import com.web.gdup.domain.cody_clothing.entity.CodyClothingEntity;
import com.web.gdup.domain.cody_clothing.entity.CodyClothingPK;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface CodyClothingRepository extends JpaRepository<CodyClothingEntity, CodyClothingPK> {
    CodyClothingEntity getCodyClothingInfoByClothingId(CodyClothingPK pk);
    @Transactional
    int deleteByCodyId(int codyId);
    List<CodyClothingEntity> getAllByCodyId(int codyId);
}
