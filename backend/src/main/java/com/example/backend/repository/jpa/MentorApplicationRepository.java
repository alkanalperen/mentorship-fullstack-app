package com.example.backend.repository.jpa;

import com.example.backend.models.Mentee;
import com.example.backend.models.MentorApplications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MentorApplicationRepository extends JpaRepository<MentorApplications,Long> {
    Optional<MentorApplications> findMentorApplicationsByMenteeName(String menteeName);

}
