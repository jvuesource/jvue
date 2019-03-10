package com.terwergreen.jvue.controller;

import com.terwergreen.jvue.core.CommonService;
import com.terwergreen.jvue.pojo.SiteConfig;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * AdminController
 *
 * @author Terwer
 * @version 1.0
 * 19-3-4 下午11:29
 **/
@Controller
public class AdminController {
    private final Log logger = LogFactory.getLog(this.getClass());
    private static final String ADMIN_PATH = "/a";

    @Resource
    private CommonService commonService;

    @RequestMapping(value = ADMIN_PATH, produces = "text/html;charset=UTF-8")
    public String index(HttpServletRequest request) {
        return admin(request);
    }

    @RequestMapping(value = ADMIN_PATH + "/*", produces = "text/html;charset=UTF-8")
    public String admin(HttpServletRequest request) {
        // 设置路由上下文
        Map<String, Object> httpContext = new HashMap<>();
        httpContext.put("url", request.getRequestURI());

        SiteConfig siteConfig = commonService.getSiteConfig();

        // 添加seo
        httpContext.put("title", siteConfig.getWebname().concat(" - ").concat(siteConfig.getWebslogen()));
        Map<String, Object> metaMap = new HashMap<>();
        metaMap.put("keywords", siteConfig.getKeywords());
        metaMap.put("description", siteConfig.getDescription());
        httpContext.put("meta", metaMap);
        // 设置到model上下文
        logger.info("httpContext=>" + httpContext);

        return "index";
    }
}
