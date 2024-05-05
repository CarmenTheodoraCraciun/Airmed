package com.example.airmed;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class Hashed {
    // Length of the salt in bytes
    private static final int SALT_LENGTH = 16;

    // Hash a string using SHA-256 and a provided salt
    public static String createHashData(String string, String salt) {
        try {
            // Create an SHA-256 MessageDigest
            MessageDigest md = MessageDigest.getInstance("SHA-256");

            // Update the digest with the salt bytes
            md.update(salt.getBytes());

            // Compute the hash of the string and salt
            byte[] hashedPassword = md.digest(string.getBytes());

            // Convert the hashed bytes to a Base64-encoded string
            return Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            // Handle any errors that occur during hashing
            throw new RuntimeException("Error hashing", e);
        }
    }

    // Generate a random salt and encode it as a Base64 string
    public static String generateSalt() {
        // Create a SecureRandom instance for generating secure random numbers
        SecureRandom random = new SecureRandom();

        // Generate a random byte array as the salt
        byte[] salt = new byte[SALT_LENGTH];
        random.nextBytes(salt);

        // Encode the salt as a Base64 string
        return Base64.getEncoder().encodeToString(salt);
    }

    public static boolean verifyHashData(String string, String salt, String hashedString) {
        // Extract the salt from the hashed string using the attribute name
        // Hash the input string with the extracted salt
        String hashedInputPassword = createHashData(string, salt);
        // Compare the computed hash with the provided hashed string
        return hashedInputPassword.equals(hashedString);
    }

    // Given the hashed data, associated salt, and attribute name, return the original data
    public static String extractDataFromHash(String hashedData, String salt) {
        // Verify the hashed data with the provided salt
        if (verifyHashData("", salt, hashedData)) {
            // Return the original data by decoding the Base64-encoded hashed data
            byte[] decodedHash = Base64.getDecoder().decode(hashedData);
            return new String(decodedHash);
        } else {
            // Handle the case where either the attribute name or salt is not present
            throw new IllegalArgumentException("Invalid hashedData or salt");
        }
    }
}