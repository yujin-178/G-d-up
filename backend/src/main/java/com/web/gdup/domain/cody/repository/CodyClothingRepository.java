package com.web.gdup.domain.cody.repository;

import com.web.gdup.domain.cody.entity.CodyClothingInfo;
import com.web.gdup.domain.cody.entity.CodyClothingPK;
import com.web.gdup.domain.cody.entity.CodyDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodyClothingRepository extends JpaRepository<CodyClothingInfo, CodyClothingPK> {
    CodyClothingInfo getCodyClothingInfoByClothingId(CodyClothingPK pk);
}
