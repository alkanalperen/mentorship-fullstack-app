package com.example.backend.services;

import com.example.backend.models.Mentee;
import com.example.backend.repository.jpa.MenteeRepository;
import com.example.backend.repository.elasticsearch.MentorSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenteeService {

    private final MenteeRepository menteeRepository;
    private final MentorSearchRepository mentorSearchRepository;

    @Autowired
    public MenteeService(MenteeRepository menteeRepository,MentorSearchRepository mentorSearchRepository) {
        this.menteeRepository = menteeRepository;
        this.mentorSearchRepository = mentorSearchRepository;
    }

    public List<Mentee> getMentees(){
      return menteeRepository.findAll();
    }


    public Mentee getMentee(Long id) {
        return menteeRepository.getById(id);
    }

    public Mentee getMentee(String name){
        Optional<Mentee> m = menteeRepository.findMenteeByName(name);
        if(m.isPresent()) {
            return m.get();
        }
        System.out.println("null");
        return null;
    }
    public void saveElasticRepository(Mentee mentor) {
        mentorSearchRepository.save(mentor);
    }

    public ResponseEntity<?> getMentorsWithSearch(String thoughts){
        if(mentorSearchRepository.findByThoughts(thoughts).size()!=0)
        return new ResponseEntity( mentorSearchRepository.findByThoughts(thoughts), HttpStatus.valueOf(200));
        else
            return new ResponseEntity( "not founded", HttpStatus.BAD_REQUEST);
    }

    public List<Mentee> getMentorsWithSubtopic( String subtopic){
        return mentorSearchRepository.findBySubTopic(subtopic);
    }


    public List<Mentee> getAllmentor( ){
        return mentorSearchRepository.findAll();
    }
    public void deleteAll(){
        mentorSearchRepository.deleteAll();
    }

    public void saveToElasticRepository(Mentee mentor){
        mentorSearchRepository.save(mentor);
    }
    public  void save ( Mentee m ){
        menteeRepository.save(m);
    }
    public void delete( Long id ){
        menteeRepository.delete(menteeRepository.getById(id));
    }
    public void deleteByName(String name){ menteeRepository.delete(menteeRepository.findMenteeByName(name).get());}

}
