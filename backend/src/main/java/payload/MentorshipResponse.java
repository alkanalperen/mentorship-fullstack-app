package payload;

import com.example.backend.models.Mentorship;
import lombok.Data;

import java.util.List;

@Data
public class MentorshipResponse {
    List<Mentorship> mentors;

    List<Mentorship> mentees;
}
