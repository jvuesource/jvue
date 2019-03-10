package com.terwergreen.jvue.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 文章详情
 *
 * @author Terwer
 * @version 1.0
 * 19-3-3 下午4:34
 **/
@Controller
public class PostController {
    private final Log logger = LogFactory.getLog(this.getClass());

    @RequestMapping(value = "/post/{postId}.html", produces = "text/html;charset=UTF-8")
    public String home(HttpServletRequest request, @PathVariable String postId) {
        // public String home(Model model, HttpServletRequest request) {
        // 设置路由上下文
        Map<String, Object> httpContext = new HashMap<>();
        httpContext.put("url", request.getRequestURI());

//        SiteConfig siteConfig = commonService.getSiteConfig();
//
//        // 添加seo
//        httpContext.put("title", siteConfig.getWebname().concat(" - ").concat(siteConfig.getWebslogen()));
//        Map<String, Object> metaMap = new HashMap<>();
//        metaMap.put("keywords", siteConfig.getKeywords());
//        metaMap.put("description", siteConfig.getDescription());
//        httpContext.put("meta", metaMap);
        // 设置到model上下文
        logger.info("httpContext=>" + httpContext);

        return "index";
    }
}
