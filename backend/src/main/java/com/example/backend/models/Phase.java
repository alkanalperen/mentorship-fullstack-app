package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer phaseId;

    private String name;

    private String endDate;

    private String endTime;

    private String assessmentOfMentor;

    private Integer ratingOfMentor;

    private String assessmentOfMentee;

    private Integer ratingOfMentee;

    private Boolean isComplete = false;

    private Boolean isMentorFinish = false;

    private Boolean isMenteeFinish = false;

    @ManyToOne
    @JsonIgnore
    private Mentorship mentorship;

    @Enumerated(EnumType.STRING)
    private phaseStatus status;

    public static enum phaseStatus {
        NOT_ACTIVE,
        ACTIVE,
        COMPLETED,
        PENDING
    }
}
