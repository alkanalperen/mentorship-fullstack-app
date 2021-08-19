package com.example.backend.services;

import com.example.backend.models.MentorApplications;
import com.example.backend.repository.jpa.MenteeRepository;
import com.example.backend.repository.jpa.MentorApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentorApplicationService {

    private final MentorApplicationRepository mentorApplicationRepository;
    private final MenteeRepository menteeRepository;


    @Autowired
    public MentorApplicationService(MentorApplicationRepository mentorApplicationRepository, MenteeRepository menteeRepository) {
        this.mentorApplicationRepository = mentorApplicationRepository;
        this.menteeRepository = menteeRepository;
    }

    public List<MentorApplications> getMentorApplications(){
        return mentorApplicationRepository.findAll();
    }

    public void postMentorApplications(MentorApplications mentorApplications){
        mentorApplicationRepository.save(mentorApplications);
    }

    public void deleteMentorApplications(MentorApplications mentorApplications){
        mentorApplicationRepository.delete(mentorApplications);
    }

    public MentorApplications getMentorApp(String menteeName){
        Optional<MentorApplications> mentorApplications =  mentorApplicationRepository.findMentorApplicationsByMenteeName(menteeName);
        if(mentorApplications.isPresent()) {
            return mentorApplications.get();
        }
        System.out.println("null");
        return null;

    }


    public MentorApplications getMentorAppByMentorAppId(Long mentorAppId) {
        Optional<MentorApplications> mentorApplications =  mentorApplicationRepository.findById(mentorAppId);
        if(mentorApplications.isPresent()) {
            return mentorApplications.get();
        }
        System.out.println("null");
        return null;
    }

    public String getMenteeName(Long mentorAppId) {
        return mentorApplicationRepository.findById(mentorAppId).get().getMenteeName();
    }
}
