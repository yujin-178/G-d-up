package com.web.gdup.domain.washing_method.repository;

import com.web.gdup.domain.washing_method.entity.WashingMethodEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WashingMethodRepository extends JpaRepository<WashingMethodEntity, Integer> {
}
