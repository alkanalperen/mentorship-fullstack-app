package com.example.backend.models;

import jdk.jfr.DataAmount;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ElementCollection
    private Set<String> subTitle;

    public Topic(String title, Set<String> subTitle) {
        this.title = title;
        this.subTitle = subTitle;
    }

    public Topic(Long id, String title, Set<String> subTitle) {
        this.id = id;
        this.title = title;
        this.subTitle = subTitle;
    }

    public Topic(String title) {
        this.title = title;
    }

    public Topic() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<String> getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(Set<String> subTitle) {
        this.subTitle = subTitle;
    }
}
