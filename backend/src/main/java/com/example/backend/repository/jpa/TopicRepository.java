package com.example.backend.repository.jpa;

import com.example.backend.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic,Long> {
    Optional<Topic> findByTitle(String title);

    Optional<Topic> findBySubTitle(String subtitle);
}
