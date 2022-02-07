package com.web.gdup.domain.hashtag.repository;

import com.web.gdup.domain.hashtag.dto.HashtagDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<HashtagDto, String> {
}
