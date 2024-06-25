package com.example.airmed;

import java.util.List;

public class PythonScriptResult {
    private String imagePath;
    private List<String> statistics;

    public PythonScriptResult(String imagePath, List<String> statistics) {
        this.imagePath = imagePath;
        this.statistics = statistics;
    }

    public String getImagePath() {
        return imagePath;
    }

    public List<String> getStatistics() {
        return statistics;
    }
}
