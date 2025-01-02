package com.nohomelesspeople.no_homeless_people.postservice;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "posts") // Koleksiyon adı: posts
public class Post {

    @Id
    private String id;            // MongoDB'de otomatik oluşturulacak

    private String username;      // Örn: "Egemen"
    private String location;      // Örn: "40.7994362,29.9525459"
    private String address;       // Örn: "XYZ Mahallesi"
    private String description;   // Örn: "someone needs in there!!!"
    private List<String> needs;   // Örn: ["a", "b", "c"]
}