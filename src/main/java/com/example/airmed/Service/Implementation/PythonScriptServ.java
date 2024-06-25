package com.example.airmed.Service.Implementation;

import com.example.airmed.PythonScriptResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class PythonScriptServ {

    @Autowired
    private ResourceLoader resourceLoader;

    public PythonScriptResult runStatisticsScript(int[] data) throws IOException, InterruptedException {
        // Construim lista de argumente pentru scriptul Python
        StringBuilder args = new StringBuilder();
        for (int num : data) {
            args.append(num).append(" ");
        }

        // Obținem calea către fișierul Python și directorul static
        String pythonScriptPath = resourceLoader.getResource("classpath:statistics.py").getURI().getPath();
        String staticDirPath = resourceLoader.getResource("classpath:static/").getURI().getPath();
        String imagePath = staticDirPath + "statistics_plot.png";

        // Rulăm scriptul Python cu argumentele necesare
        ProcessBuilder processBuilder = new ProcessBuilder("python3", pythonScriptPath, args.toString(), imagePath);
        Process process = processBuilder.start();

        // Așteptăm finalizarea procesului
        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Python script execution failed with exit code: " + exitCode);
        }

        // Citim datele statistice din stdout-ul procesului
        List<String> outputLines = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        while ((line = reader.readLine()) != null) {
            outputLines.add(line);
        }

        // Scriem imaginea în directorul static
        writeImageToStaticDirectory(imagePath);

        // Returnăm obiectul cu rezultatele (calea către imagine și datele statistice)
        return new PythonScriptResult(imagePath, outputLines);
    }

    private void writeImageToStaticDirectory(String imagePath) throws IOException {
        // Creăm directorul static dacă nu există
        File staticDir = new File("src/main/resources/static/");
        if (!staticDir.exists()) {
            staticDir.mkdirs();
        }

        // Copiem imaginea generată în directorul static
        Path srcPath = Path.of(imagePath);
        Path destPath = Path.of(staticDir.getPath(), "statistics_plot.png");
        Files.copy(srcPath, destPath);
    }
}