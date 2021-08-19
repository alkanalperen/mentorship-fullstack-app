package com.example.backend.controllers;

import com.example.backend.models.Mentee;
import com.example.backend.services.MenteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/mentee")
public class MenteeController {

    private final MenteeService menteeService;

    @Autowired
    public MenteeController(MenteeService menteeService) {
        this.menteeService = menteeService;
    }

    @GetMapping
    public List<Mentee> getMentees(){
       return menteeService.getMentees();
    }

    @GetMapping(path = "/{id}")
    public Mentee getMentee(@PathVariable Long id){
        System.out.println("dsa");
        return menteeService.getMentee(id);
    }

    @GetMapping(path = "/sa/{name}")
    public Mentee getMentee( @PathVariable  String name){
            return (Mentee) menteeService.getMentee(name);
    }

    @PostMapping()
    public String getMentee(@RequestBody Mentee mentee){
return  "post invoked";
    }


    @GetMapping(path = "/elasticsearch/thoughts/{thoughts}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getMentorsByThoughts(@PathVariable String thoughts){
        return menteeService.getMentorsWithSearch(thoughts);
    }
    @GetMapping(path = "/elasticsearch/subt/{subt}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public List<Mentee> getMentorsBySubT(@PathVariable String subt){
        return menteeService.getMentorsWithSubtopic(subt);
    }

    @GetMapping(path = "/all")
    public List<Mentee> getAll(){
        return menteeService.getAllmentor();
    }


    @PostMapping(path = "/create")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void createMentee(@RequestBody Mentee m){
        menteeService.save(m);
    }

    @DeleteMapping(path = "/delete")
    public void createMentee(@RequestParam Long id){
        menteeService.delete(id);
    }

    @DeleteMapping(path="/reset/elastic")
    public void deleteElastic(){
        menteeService.deleteAll();
    }



}
