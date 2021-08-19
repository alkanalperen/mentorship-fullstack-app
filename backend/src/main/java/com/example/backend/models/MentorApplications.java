package com.example.backend.models;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table
public class MentorApplications {
    @Id
    @SequenceGenerator(
            name="mentorapp_sequence",
            sequenceName =" mentorapp_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator ="mentorapp_sequence"

    )
    private Long id;
    private String menteeName;
    private String mainTopic;
    @ElementCollection
    private Set<String> subTopic;

    private String thoughts;

    public MentorApplications(Long id, String menteeName, String mainTopic) {
        this.id = id;
        this.menteeName = menteeName;
        this.mainTopic = mainTopic;
    }

    public MentorApplications(Long id, String menteeName, String mainTopic, Set<String> subTopic, String thoughts) {
        this.id = id;
        this.menteeName = menteeName;
        this.mainTopic = mainTopic;
        this.subTopic = subTopic;
        this.thoughts = thoughts;
    }

    public MentorApplications() {
    }

    public MentorApplications(String menteeName, String mainTopic) {
        this.menteeName = menteeName;
        this.mainTopic = mainTopic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMenteeName() {
        return menteeName;
    }

    public void setMenteeid(String menteeName) {
        this.menteeName = menteeName;
    }

    public MentorApplications(String menteeName, String mainTopic, Set<String> subTopic, String thoughts) {
        this.menteeName = menteeName;
        this.mainTopic = mainTopic;
        this.subTopic = subTopic;
        this.thoughts = thoughts;
    }

    public void setMenteeName(String menteeName) {
        this.menteeName = menteeName;
    }

    public String getMainTopic() {
        return mainTopic;
    }

    public void setMainTopic(String mainTopic) {
        this.mainTopic = mainTopic;
    }

    public Set<String> getSubTopic() {
        return subTopic;
    }

    public void setSubTopic(Set<String> subTopic) {
        this.subTopic = subTopic;
    }

    public String getThoughts() {
        return thoughts;
    }

    public void setThoughts(String thoughts) {
        this.thoughts = thoughts;
    }

    @Override
    public String toString() {
        return "MentorApplications{" +
                "id=" + id +
                ", menteeName='" + menteeName + '\'' +
                ", mainTopic='" + mainTopic + '\'' +
                ", subTopic='" + subTopic + '\'' +
                ", thoughts='" + thoughts + '\'' +
                '}';
    }
}
