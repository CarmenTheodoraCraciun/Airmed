package com.example.airmed.Controller;

import com.example.airmed.Entity.Answer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
public class GraphCtrl {
    @GetMapping("/displayBarGraph")
    public String barGraph(Model model, @RequestParam("answers")  List<Answer> answers) {
        List<Integer> values = new ArrayList<>();

        for (Answer answer : answers) {
            values.add(answer.getAnswer());
        }
        model.addAttribute("values", values);
        return "barGraph";
    }
}
