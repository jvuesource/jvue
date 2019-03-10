package com.terwergreen.jvue.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 入口
 *
 * @author Terwer
 * @version 1.0
 * 2019/1/10 18:51
 **/
@Controller
public class MainController {
    private final Log logger = LogFactory.getLog(this.getClass());

//    @Resource
//    private CommonService commonService;

    @RequestMapping(value = "/", produces = "text/html;charset=UTF-8")
    public String index(HttpServletRequest request) {
        return home(request);
    }

    @RequestMapping(value = "/home", produces = "text/html;charset=UTF-8")
    public String home(HttpServletRequest request) {
//        // public String home(Model model, HttpServletRequest request) {
//        // 设置路由上下文
//        Map<String, Object> httpContext = new HashMap<>();
//        httpContext.put("url", request.getRequestURI());
//
//        SiteConfig siteConfig = commonService.getSiteConfig();
//
//        // 添加seo
//        httpContext.put("title", siteConfig.getWebname().concat(" - ").concat(siteConfig.getWebslogen()));
//        Map<String, Object> metaMap = new HashMap<>();
//        metaMap.put("keywords", siteConfig.getKeywords());
//        metaMap.put("description", siteConfig.getDescription());
//        httpContext.put("meta", metaMap);
//        // 设置到model上下文
//        logger.info("httpContext=>" + httpContext);
        return "index";
    }
}
