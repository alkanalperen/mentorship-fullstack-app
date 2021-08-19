package com.example.backend.repository.jpa;

import com.example.backend.models.Mentee;
import com.example.backend.models.Mentorship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentorshipRepository extends JpaRepository<Mentorship,Long> {
    Optional<List<Mentorship>> findMentorshipByMenteeName(String menteeName);
    Optional<List<Mentorship>> findMentorshipByMentorName(String mentorName);
}
