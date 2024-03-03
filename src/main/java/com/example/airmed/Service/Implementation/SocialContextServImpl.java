package com.example.airmed.Service.Implementation;
import com.example.airmed.Entity.Patient;
import com.example.airmed.Entity.SocialContext;
import com.example.airmed.Repository.SocialContextRepo;
import com.example.airmed.Service.Inteface.SocialContextServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public SocialContext findSocialContextByPatient(Patient patient) {
        return socialContextRepo.findByPatient(patient)
                .orElse(null);
    }

    @Override
    public void deleteSocialContext(Long id) {
        socialContextRepo.deleteById(id);
    }

    @Override
    @Transactional
    public SocialContext updateSocialContext(SocialContext oldSocialContext, SocialContext newSocialContext) {
        if (oldSocialContext != null && socialContextRepo.existsById(oldSocialContext.getId())) {
            if(newSocialContext.getOccupation() != null)
                oldSocialContext.setOccupation(newSocialContext.getOccupation());
            if(newSocialContext.getHighestEdu() != null)
                oldSocialContext.setHighestEdu(newSocialContext.getHighestEdu());
            if(newSocialContext.getRelationship() != null)
                oldSocialContext.setRelationship(newSocialContext.getRelationship());
            oldSocialContext.setSexuallyActive(newSocialContext.isSexuallyActive());
            if(newSocialContext.getGenderOrientatin() != null)
                oldSocialContext.setGenderOrientatin(newSocialContext.getGenderOrientatin());
            if(newSocialContext.getLegalProblems() != null)
                oldSocialContext.setLegalProblems(newSocialContext.getLegalProblems());
            oldSocialContext.setAdopted(newSocialContext.isAdopted());
            if(newSocialContext.getFamily() != null)
                oldSocialContext.setFamily(newSocialContext.getFamily());
            if(newSocialContext.getFamilyPsychiatric() != null)
                oldSocialContext.setFamilyPsychiatric(newSocialContext.getFamilyPsychiatric());
            if(newSocialContext.getDrugs() != null)
                oldSocialContext.setDrugs(newSocialContext.getDrugs());
            if(newSocialContext.getAlcohol() != null)
                oldSocialContext.setAlcohol(newSocialContext.getAlcohol());
            if(newSocialContext.getAbuseMeds() != null)
                oldSocialContext.setAbuseMeds(newSocialContext.getAbuseMeds());
            if(newSocialContext.getCaffeine() != null)
                oldSocialContext.setCaffeine(newSocialContext.getCaffeine());
            if(newSocialContext.getCigarettes() != null)
                oldSocialContext.setCigarettes(newSocialContext.getCigarettes());
            if(newSocialContext.getExercise() != null)
                oldSocialContext.setExercise(newSocialContext.getExercise());

            return socialContextRepo.save(oldSocialContext);
        }
        return null;
    }
}
