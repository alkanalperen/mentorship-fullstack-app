package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    public String sendMail() {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);

        try {
            messageHelper.setTo("egeyagibasan@gmail.com");
            messageHelper.setText("Haydi çabuk ol! Zamanın doluyor. Fazının dolmasına bir saat kaldı");
            messageHelper.setSubject("Faz Bitiş Hatırlatma");
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error...";
        }
        mailSender.send(mimeMessage);
        return "Mail Sent!";
    }
}
