package com.kob.backend.service.article;

import java.util.Map;

public interface AddArticleService {

    Map<String,String> add(String articleName, String articleContent, Integer userId);
}
