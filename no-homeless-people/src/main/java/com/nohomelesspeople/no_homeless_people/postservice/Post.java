package com.nohomelesspeople.no_homeless_people.postservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
class Creator {
    private String username;
    private String photo;
}

@Data
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    private Creator creator;


    private String location;     // Örn: "40.7994362,29.9525459"
    private String address;      // Örn: "XYZ Mahallesi"
    private String description;  // Örn: "someone needs in there!!!"
    private List<String> needs;  // Örn: ["ekmek", "su", "kofte"]

    private LocalDateTime createTime;
}