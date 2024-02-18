package com.example.airmed.Service.Implementation;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Repository.SocialContextRepo;
import com.example.airmed.Service.Inteface.SocialContextServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class SocialContextServImpl implements SocialContextServ {
    private final SocialContextRepo socialContextRepo;
    @Autowired
    public SocialContextServImpl(SocialContextRepo socialContextRepo){
        this.socialContextRepo = socialContextRepo;
    }
    @Override
    public SocialContext saveSocialContext(SocialContext socialContext) {
        return socialContextRepo.save(socialContext);
    }

    @Override
    public SocialContext getSocialConetextById(Long id) {
        return socialContextRepo.findById(id).orElse(null);
    }

    @Override
    public SocialContext findByPatient(Patient patient) {
        return socialContextRepo.findByPatient(patient)
                .orElse(null);
    }

    @Override
    public void deleteSocialContext(Long id) {
        socialContextRepo.deleteById(id);
    }
}
