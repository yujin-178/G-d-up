package com.web.gdup.domain.cody.repository;

import com.web.gdup.domain.cody.entity.CodyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface CodyRepository extends JpaRepository<CodyEntity, Integer> {
    List<CodyEntity> findAllByUserName(String userName);

    @Transactional
    int deleteByCodyId(int id);
}
