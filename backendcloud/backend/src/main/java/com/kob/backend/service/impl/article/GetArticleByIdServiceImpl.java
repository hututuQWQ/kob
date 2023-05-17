package com.kob.backend.service.impl.article;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.mapper.ArticleMapper;
import com.kob.backend.service.article.GetArticleByIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetArticleByIdServiceImpl implements GetArticleByIdService {

    @Autowired
    private ArticleMapper articleMapper;

    @Override
    public JSONObject getArticle(Integer id) {
        String content = articleMapper.selectById(id).getArticleContent();

        JSONObject resp = new JSONObject();

        resp.put("article_content",content);

        return resp;
    }
}
