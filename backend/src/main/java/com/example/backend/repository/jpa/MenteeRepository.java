package com.example.backend.repository.jpa;

import com.example.backend.models.Mentee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MenteeRepository extends JpaRepository<Mentee,Long> {

Optional<Mentee> findMenteeByName(String name);
}
