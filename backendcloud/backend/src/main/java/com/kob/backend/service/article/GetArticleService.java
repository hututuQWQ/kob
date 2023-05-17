package com.kob.backend.service.article;

import com.alibaba.fastjson2.JSONObject;

public interface GetArticleService {
    JSONObject getArticle(Integer page);
}
