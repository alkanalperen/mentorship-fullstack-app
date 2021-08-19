package com.example.backend.controllers;

import com.example.backend.models.Mentee;
import com.example.backend.models.MentorApplications;
import com.example.backend.services.MenteeService;
import com.example.backend.services.MentorApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/mentorapplication")
public class MentorApplicationsController {

    private final MentorApplicationService mentorApplicationService;
    private final MenteeService menteeService;

    @Autowired
    public MentorApplicationsController(MentorApplicationService mentorApplicationService,MenteeService menteeService) {
        this.mentorApplicationService = mentorApplicationService;
        this.menteeService = menteeService;
    }

    @GetMapping()
    @PreAuthorize("hasRole('ROLE_ADMINS')or hasRole('ROLE_USER')")
    public List<MentorApplications> getMentorApplications(){
        return mentorApplicationService.getMentorApplications();
    }

    @PostMapping("/apply")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public void postMentorApplication(@RequestBody MentorApplications mentorApplications){
        System.out.println("dsa");
         mentorApplicationService.postMentorApplications(mentorApplications);
    }

    @PostMapping(path = "/approve/{mentorAppId}")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void approveMentorApplication(@PathVariable Long mentorAppId){
        MentorApplications mentorapplication = mentorApplicationService.getMentorAppByMentorAppId(mentorAppId);
        String menteeName = mentorapplication.getMenteeName() ;
        Mentee m = menteeService.getMentee(menteeName);
        m.setThoughts(mentorapplication.getThoughts());
        menteeService.deleteByName(menteeName);
        m.setIsMentor(true);
        String joined = String.join(",", mentorapplication.getSubTopic());
        m.setSubTopic(joined);
        m.setMainTopic(mentorapplication.getMainTopic());
        System.out.println(menteeName);
        mentorApplicationService.deleteMentorApplications(mentorapplication);
        menteeService.save(m);
        menteeService.saveToElasticRepository(m);
    }

    @DeleteMapping(path = "/delete/{mentorAppId}")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void deleteMentorApplication(@PathVariable Long mentorAppId){
        MentorApplications m =  mentorApplicationService.getMentorAppByMentorAppId(mentorAppId);
        mentorApplicationService.deleteMentorApplications(m);
    }






}
