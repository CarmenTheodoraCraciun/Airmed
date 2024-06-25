package com.example.airmed.Controller;
import com.example.airmed.PythonScriptResult;
import com.example.airmed.Service.Implementation.PythonScriptServ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RestController
public class StatisticsController {

    @Autowired
    private PythonScriptServ pythonScriptService;

    @GetMapping("/generateStatistics")
    public ResponseEntity<PythonScriptResult> generateStatistics(@RequestParam("values") String valuesStr) {
        // Parse the values string into an int array
        int[] data = Arrays.stream(valuesStr.split(","))
                .mapToInt(Integer::parseInt)
                .toArray();

        try {
            PythonScriptResult result = pythonScriptService.runStatisticsScript(data);
            return ResponseEntity.ok(result);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

