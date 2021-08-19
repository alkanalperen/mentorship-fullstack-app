package com.example.backend.controllers;

import com.example.backend.models.MentorApplications;
import com.example.backend.models.Topic;
import com.example.backend.services.TopicService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/topic")
public class TopicController {
    private final TopicService topicService;

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }


    @GetMapping()
    @PreAuthorize("hasRole('ROLE_ADMINS')or hasRole('ROLE_USER')")
    public List<Topic> getTopics(){
        return topicService.getTopics();
    }

    @PostMapping("/add/main")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void addMainTopic(@RequestBody Topic t ){
        topicService.createMainTopic(t);
    }

    @PostMapping("/add/{title}")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void addSubTopic(@PathVariable String title, @RequestBody String subtitle){
        topicService.addSubTopic(title,subtitle);
    }


    @DeleteMapping("/remove")
    @PreAuthorize("hasRole('ROLE_ADMINS')")
    public void del(@RequestParam(value = "main", required = false) String main,
                                      @RequestParam(value = "sub", required = false) String sub) {
        if (main != null) {
             topicService.deleteMainTopic(main);
        } else {
             topicService.deleteSubTopic(sub);
        }
    }

   @GetMapping("/{title}")
   @PreAuthorize("hasRole('ROLE_ADMINS')or hasRole('ROLE_USER')")
   public void getSubTopic(@PathVariable String title){
       topicService.getTopic(title);
   }



}
