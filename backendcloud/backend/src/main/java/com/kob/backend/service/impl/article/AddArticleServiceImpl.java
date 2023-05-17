package com.kob.backend.service.impl.article;

import com.kob.backend.mapper.ArticleMapper;
import com.kob.backend.pojo.Article;
import com.kob.backend.service.article.AddArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddArticleServiceImpl implements AddArticleService {

    @Autowired
    ArticleMapper articleMapper;

    @Override
    public Map<String, String> add(String articleName, String articleContent, Integer userId) {
        Map<String,String> map = new HashMap<>();

        Article article = new Article(null,articleName,articleContent,userId,new Date());

        articleMapper.insert(article);

        map.put("error_message","success");

        return map;
    }
}
