package com.example.backend.models;

import jdk.jfr.DataAmount;
import lombok.Data;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
//import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Document(indexName = "mentee")
public class Mentee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String thoughts;

    @Field(type = FieldType.Boolean)
    private Boolean isMentor = false;

    @Field(type = FieldType.Text)
    private String mainTopic;

    @Field(type = FieldType.Text)
    private String subTopic;


    public Mentee() {
    }

    @Override
    public String toString() {
        return "Mentee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", thoughts='" + thoughts + '\'' +
                '}';
    }
}
