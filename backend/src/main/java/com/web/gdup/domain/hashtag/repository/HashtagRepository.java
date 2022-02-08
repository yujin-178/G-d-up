package com.web.gdup.domain.hashtag.repository;

import com.web.gdup.domain.hashtag.entity.HashtagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<HashtagEntity, String> {
}
