package com.kob.backend.controller.article;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.service.article.GetArticleByIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GetArticleByIdController {
    @Autowired
    private GetArticleByIdService getArticleByIdService;

    @GetMapping("/api/article/getArticleById/")
    JSONObject getList(@RequestParam Map<String,String> data) {
        Integer articleId = Integer.parseInt(data.get("articleId"));
        return getArticleByIdService.getArticle(articleId);
    }
}
