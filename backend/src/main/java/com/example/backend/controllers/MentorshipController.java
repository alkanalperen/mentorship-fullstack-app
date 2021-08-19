package com.example.backend.controllers;

import com.example.backend.models.Phase;
import org.springframework.security.access.prepost.PreAuthorize;
import payload.MentorshipResponse;
import com.example.backend.services.MentorshipService;
import org.springframework.web.bind.annotation.*;
import payload.PhaseAssesment;

import java.security.Principal;

@RestController
@RequestMapping(path="api/mentorship")
public class MentorshipController {
    private final MentorshipService mentorshipService;

    public MentorshipController(MentorshipService mentorshipService) {
        this.mentorshipService = mentorshipService;
    }

    @PostMapping(path = "/create/{menteeName}")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public String createMentorship(@RequestBody Long mentorId, @PathVariable String menteeName){
        return mentorshipService.createMentorship( mentorId,menteeName);
    }

    @GetMapping(path = "/get/{username}")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public MentorshipResponse getMentorship(@PathVariable String username){
       return  mentorshipService.getMentorships(username);
    }

    @PostMapping(path = "/add/phase/{mentorshipId}")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public void addPhase(@RequestBody Phase phase,@PathVariable Long mentorshipId){
        mentorshipService.addPhase(mentorshipId,phase);
    }

    @PostMapping(path = "/start/process/{mentorshipId}")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public void startProcess(@PathVariable Long mentorshipId){
        mentorshipService.startProcess(mentorshipId);
    }

    @PostMapping(path = "/finish/phase/{phaseId}")
    @PreAuthorize(" hasRole('ROLE_USER')")
    public void finishPhase(@PathVariable Long phaseId, Principal principal, @RequestBody PhaseAssesment phaseAssesment){
        mentorshipService.finishPhase(phaseId, principal.getName(), phaseAssesment);
    }

}
