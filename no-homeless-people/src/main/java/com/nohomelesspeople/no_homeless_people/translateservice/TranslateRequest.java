package com.nohomelesspeople.no_homeless_people.translateservice;

import lombok.Data;

@Data
public class TranslateRequest {
    private String text;
    private String targetLanguage;
}