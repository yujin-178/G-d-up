package com.web.gdup.domain.cody.repository;

import com.web.gdup.domain.cody.entity.CodyHashPK;
import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface CodyHashtagRepository extends JpaRepository<CodyHashtagEntity, CodyHashPK> {
    @Transactional
    int deleteByCodyId(int codyId);
}
