package com.web.gdup.domain.cody.repository;

import com.web.gdup.domain.cody.entity.CodyHashPK;
import com.web.gdup.domain.cody.entity.CodyHashtagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CodyHashtagRepository extends JpaRepository<CodyHashtagEntity, CodyHashPK> {
    @Transactional
    int deleteByCodyId(int codyId);

    @Query(value = "select tagName, count(codyId) as weight from cody_hashtag " +
            "group by tagName"
            , nativeQuery = true)
    List<Object[]> getlist();


    List<CodyHashtagEntity> findAllByTagNameContains(String tagName);
}
