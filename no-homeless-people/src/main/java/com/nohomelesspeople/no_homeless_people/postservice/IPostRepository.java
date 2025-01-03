package com.nohomelesspeople.no_homeless_people.postservice;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends MongoRepository<Post, String> {

    // creator.username'e göre bulmak için:
    List<Post> findByCreatorUsername(String username);
}
