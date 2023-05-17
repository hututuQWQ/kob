package com.kob.backend.controller.article;

import com.kob.backend.service.article.AddArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AddArticleController {

    @Autowired
    private AddArticleService addArticleService;

    @PostMapping("/api/article/addArticle/")
    public Map<String,String> register(@RequestBody Map<String,String> map) {
        String articleName = map.get("articleName");
        String articleContent = map.get("articleContent");
        Integer userId = Integer.parseInt((map.get("userId")));

        return addArticleService.add(articleName,articleContent,userId);
    }
}
