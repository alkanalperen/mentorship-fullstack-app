package com.example.backend.models;

import lombok.Data;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

    @Entity
    @Data
    public class Mentorship {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String mentorThoughts;

        private String menteeThoughts;

        private Integer numberOfPhases;

        private Integer currentPhase;

        private Boolean hasPhase = false;

        private String mentorName;

        private String menteeName;

        private String mainTopic;

        String startDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        @OneToMany(mappedBy = "mentorship", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Phase> phases = new ArrayList<Phase>();

        private String status;

        public static enum status {
            NOT_STARTED("Not Started"),
            COMPLETED("Completed"),
            CONTINUING("Continuing");

            private String name;

            status(String name) {
                this.name = name;
            }

            public String getName() {
                return this.name;
            }

        }
    }


