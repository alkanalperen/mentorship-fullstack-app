package com.example.backend.services;

import com.example.backend.controllers.EmailController;
import com.example.backend.models.Mentee;
import com.example.backend.models.Mentorship;
import com.example.backend.repository.elasticsearch.MentorSearchRepository;
import org.springframework.http.ResponseEntity;
import payload.MentorshipResponse;
import com.example.backend.models.Phase;
import com.example.backend.repository.jpa.MenteeRepository;
import com.example.backend.repository.jpa.MentorshipRepository;
import com.example.backend.repository.jpa.PhaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import payload.PhaseAssesment;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class MentorshipService {
    private final MentorshipRepository mentorshipRepository;
    private final PhaseRepository phaseRepository;
    private final MenteeRepository menteeRepository;
    private final MentorSearchRepository mentorSearchRepository;
    private final EmailController emailController;

    @Autowired
    public MentorshipService(MentorshipRepository mentorshipRepository, PhaseRepository phaseRepository,MenteeRepository menteeRepository,MentorSearchRepository mentorSearchRepository,EmailController emailController) {
        this.mentorshipRepository = mentorshipRepository;
        this.phaseRepository = phaseRepository;
        this.menteeRepository = menteeRepository;
        this.mentorSearchRepository = mentorSearchRepository;
        this.emailController = emailController;
    }

    public String createMentorship(Long mentorId, String menteeName){
        Mentorship mentorship = new Mentorship();
        Mentee mentor = mentorSearchRepository.getById(mentorId);
        String mentorName = mentor.getName();

        //if mentee has already mentorship
        if(mentorshipRepository.findMentorshipByMenteeName(menteeName).get().size()!= 0)
            return "mentee has already mentorship";
        //if mentor has already  2 mentorship
            if(mentorshipRepository.findMentorshipByMentorName(mentorName).get().size()>=2)
            return "mentor has already 2 mentorship";
            
        mentorship.setMenteeName(menteeName);
        mentorship.setMentorName(mentorName);
        mentorship.setCurrentPhase(0);
        mentorship.setStatus(Mentorship.status.NOT_STARTED.getName());
        mentorship.setHasPhase(false);
        mentorship.setMainTopic(mentor.getMainTopic());
        mentorshipRepository.save(mentorship);
        return "succes";
    }

    public MentorshipResponse getMentorships(String username){
        MentorshipResponse mentorshipResponse  = new MentorshipResponse();

        Optional<List<Mentorship>> mentors = mentorshipRepository.findMentorshipByMentorName(username);
        mentors.ifPresent(mentorshipResponse::setMentors);

        Optional<List<Mentorship>> mentees = mentorshipRepository.findMentorshipByMenteeName(username);
        mentees.ifPresent(mentorshipResponse::setMentees);

        return mentorshipResponse;
    }

    public void addPhase(Long id, Phase phase){
        Mentorship mentorship = mentorshipRepository.getById(id);

        // phases recorded now send email
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                if(phase.getStatus()!=Phase.phaseStatus.COMPLETED  ){
                    emailController.sendMail();
                }
            }
        };
        try {
            Date date1 = new SimpleDateFormat("dd/MM/yyyy").parse(phase.getEndDate());
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date1);
            Timer t = new Timer();
            Calendar cal = Calendar.getInstance();
            LocalTime time = LocalTime.parse(phase.getEndTime()) ;
            Instant instant = time.atDate(LocalDate.of(calendar.get(Calendar.YEAR),calendar.get(Calendar.MONTH),calendar.get(Calendar.DAY_OF_MONTH)
)).atZone(ZoneId.systemDefault()).toInstant();
            Date time2 = Date.from(instant);
            System.out.println(time2);

            cal.setTime(time2);
            cal.add(Calendar.HOUR_OF_DAY, -1);
            t.schedule(task, cal.getTime());
            System.out.println(cal.getTime());

        }catch(Exception e )
        {

        }

        phase.setMentorship(mentorship);
        phase.setStatus(Phase.phaseStatus.NOT_ACTIVE);
        phase.setPhaseId(mentorship.getPhases().size() + 1);
        phaseRepository.save(phase);
        mentorship.setNumberOfPhases(mentorship.getPhases().size() + 1);
        mentorship.setHasPhase(true);
        mentorshipRepository.save(mentorship);


    }

    public void  startProcess( Long id){
        Mentorship mentorship = mentorshipRepository.getById(id);

        List<Phase> phases = mentorship.getPhases();
        phases.get(0).setStatus(Phase.phaseStatus.ACTIVE);

        mentorship.setStatus(Mentorship.status.CONTINUING.getName());
        mentorship.setCurrentPhase(1);
        mentorship.setPhases(phases);

        mentorshipRepository.save(mentorship);

    }

    public void finishPhase(Long phaseId, String menteeName, PhaseAssesment phaseAssesment){
        System.out.println(menteeName);
        Phase phase = phaseRepository.getById(phaseId);
        Mentorship mentorship = phase.getMentorship();
        Optional<Mentee> user = menteeRepository.findMenteeByName(menteeName);
        if(user.isPresent()){
            Mentee mentee = user.get();
            System.out.println("dsa");
            if(mentee.getName().equals(mentorship.getMentorName())){
                System.out.println("dsa");
                phase.setAssessmentOfMentor(phaseAssesment.getAssessment());
                phase.setIsMentorFinish(true);
                if (phase.getIsMenteeFinish()) {
                    phase.setIsComplete(true);
                    phase.setStatus(Phase.phaseStatus.COMPLETED);
                } else {
                    phase.setStatus(Phase.phaseStatus.PENDING);
                    if (mentorship.getCurrentPhase() < mentorship.getNumberOfPhases()) {
                        mentorship.setCurrentPhase(mentorship.getCurrentPhase() + 1);
                    }
                }
                if (phase.getPhaseId().equals(mentorship.getNumberOfPhases()) && phase.getIsMenteeFinish()) {
                    mentorship.setStatus(Mentorship.status.COMPLETED.getName());
                }
                phase.setRatingOfMentor(phaseAssesment.getRating());

            }
            else if (mentee.getName().equals(mentorship.getMenteeName())) {
                phase.setAssessmentOfMentee(phaseAssesment.getAssessment());
                phase.setIsMenteeFinish(true);
                if (phase.getIsMentorFinish()) {
                    phase.setIsComplete(true);
                    phase.setStatus(Phase.phaseStatus.COMPLETED);
                } else {
                    phase.setStatus(Phase.phaseStatus.PENDING);
                    if (mentorship.getCurrentPhase() < mentorship.getNumberOfPhases()) {
                        mentorship.setCurrentPhase(mentorship.getCurrentPhase() + 1);
                    }
                }
                if (phase.getPhaseId().equals(mentorship.getNumberOfPhases()) && phase.getIsMentorFinish()) {
                    mentorship.setStatus(Mentorship.status.COMPLETED.getName());
                }
                phase.setRatingOfMentee(phaseAssesment.getRating());
            }
            mentorship.getPhases().forEach(phase1 -> {
                if (phase1.getPhaseId().equals(mentorship.getCurrentPhase())) {
                    if (!phase.getPhaseId().equals(mentorship.getNumberOfPhases())) {
                        phase1.setStatus(Phase.phaseStatus.ACTIVE);
                    }
                }
            });
        }
        mentorshipRepository.save(mentorship);
        phaseRepository.save(phase);

    }



}
