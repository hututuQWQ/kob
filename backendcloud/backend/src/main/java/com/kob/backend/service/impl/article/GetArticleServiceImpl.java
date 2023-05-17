package com.kob.backend.service.impl.article;

import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kob.backend.mapper.ArticleMapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.Article;
import com.kob.backend.pojo.User;
import com.kob.backend.service.article.GetArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class GetArticleServiceImpl implements GetArticleService {

    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public JSONObject getArticle(Integer page) {
        IPage<Article> recordIPage = new Page<>(page, 10);
        QueryWrapper<Article> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("id");
        List<Article> articles = articleMapper.selectPage(recordIPage, queryWrapper).getRecords();
        JSONObject resp = new JSONObject();
        List<JSONObject> items = new LinkedList<>();

        for(Article article : articles) {
            User userA = userMapper.selectById(article.getUserId());
            JSONObject item = new JSONObject();

            item.put("id",article.getId());
            item.put("article_name",article.getArticleName());
            item.put("article_content",article.getArticleContent());
            item.put("article_author",userA.getUsername());
            item.put("article_photo",userA.getPhoto());
            item.put("article_createtime",article.getCreatetime());

            items.add(item);
        }

        resp.put("articles", items);
        resp.put("articles_count", articleMapper.selectCount(null));

        return resp;
    }

}
