package com.example.backend.repository.elasticsearch;

import com.example.backend.models.Mentee;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MentorSearchRepository extends ElasticsearchRepository<Mentee,Long> {
    List<Mentee> findAll();

    List<Mentee> findByThoughts(String thoughts);

    Mentee getById(Long id);

    @Override
    void deleteAll();

    List<Mentee> findBySubTopic(String subtopic);
}
