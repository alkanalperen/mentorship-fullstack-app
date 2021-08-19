package com.example.backend.services;

import com.example.backend.models.Topic;
import com.example.backend.repository.jpa.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public void createMainTopic(Topic topic){
        topicRepository.save(topic);
    }

    public void addSubTopic(String title, String subTitle){
        Optional<Topic> t = topicRepository.findByTitle(title);
        Topic topic;
        if(t.isPresent()) {
            topic = t.get();
        }
        else{
            topic = new Topic();
        }

        Set<String> subTitles = topic.getSubTitle();
        subTitles.add(subTitle);
        topicRepository.save(topic);
    }

    public List<Topic> getTopics(){
        return topicRepository.findAll();
    }

    public void deleteMainTopic(String t ){
        topicRepository.delete(topicRepository.findByTitle(t).get());
    }

    public void deleteSubTopic(String t){
        Topic topic = topicRepository.findBySubTitle(t).get();
        Set<String> sub = topic.getSubTitle();
        sub.remove(t);
        topic.setSubTitle(sub);
        topicRepository.save(topic);    }

    public  void getTopic(String title){
        topicRepository.findByTitle(title).get().getSubTitle();
    }
}
