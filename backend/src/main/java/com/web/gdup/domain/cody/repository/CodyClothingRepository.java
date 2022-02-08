package com.web.gdup.domain.cody.repository;

import com.web.gdup.domain.cody.entity.CodyClothingEntity;
import com.web.gdup.domain.cody.entity.CodyClothingPK;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface CodyClothingRepository extends JpaRepository<CodyClothingEntity, CodyClothingPK> {
    CodyClothingEntity getCodyClothingInfoByClothingId(CodyClothingPK pk);
    @Transactional
    int deleteByCodyId(int codyId);
}
