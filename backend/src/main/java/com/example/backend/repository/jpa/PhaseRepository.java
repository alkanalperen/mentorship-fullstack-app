package com.example.backend.repository.jpa;

import com.example.backend.models.Phase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhaseRepository extends JpaRepository<Phase,Long> {
}
