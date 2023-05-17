package com.kob.backend.controller.article;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.service.article.GetArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GetArticleController {

    @Autowired
    private GetArticleService getArticleService;

    @GetMapping("/api/article/getArticle/")
    JSONObject getList(@RequestParam Map<String,String> data) {
        Integer page = Integer.parseInt(data.get("page"));
        return getArticleService.getArticle(page);
    }
}
