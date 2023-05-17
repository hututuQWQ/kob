package com.kob.backend.service.article;

import com.alibaba.fastjson2.JSONObject;

import java.util.Map;

public interface GetArticleByIdService {
    JSONObject getArticle(Integer id);
}
