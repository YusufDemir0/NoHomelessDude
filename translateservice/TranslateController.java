package com.nohomelesspeople.no_homeless_people.translateservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/translate")
public class TranslateController {

    @Autowired
    private GoogleTranslateService googleTranslateService;

    @PostMapping
    public String translateWithDetection(@RequestBody TranslateRequest request) {
        return googleTranslateService.translateTextWithDetection(request.getText(), request.getTargetLanguage());
    }
}