package com.nohomelesspeople.no_homeless_people.translateservice;

import com.google.cloud.translate.Detection;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GoogleTranslateService {

    @Value("${google.translate.api-key}")
    private String apiKey;

    public String translateTextWithDetection(String text, String targetLanguage) {
        try {
            Translate translate = TranslateOptions.newBuilder()
                    .setApiKey(apiKey)
                    .build()
                    .getService();

            // Kaynak dili algıla
            Detection detection = translate.detect(text);
            String sourceLanguage = detection.getLanguage();

            // Çeviri işlemi
            Translation translation = translate.translate(
                    text,
                    Translate.TranslateOption.sourceLanguage(sourceLanguage),
                    Translate.TranslateOption.targetLanguage(targetLanguage)
            );

            String translationText = translation.getTranslatedText();
            return translation.getTranslatedText();
        } catch (Exception e) {
            throw new RuntimeException("Çeviri sırasında bir hata oluştu: " + e.getMessage());
        }
    }

}