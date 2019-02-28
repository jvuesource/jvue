package com.terwergreen.jvue.controller;

import com.terwergreen.jvue.core.CommonService;
import com.terwergreen.jvue.pojo.SiteConfig;
import com.terwergreen.jvue.vendor.vue.VueRenderer;
import com.terwergreen.jvue.vendor.vue.VueUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 关于
 *
 * @author Terwer
 * @version 1.0
 * 2019/1/10 18:51
 **/
@Controller
public class AboutController {
    private final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private VueRenderer vueRenderer;

    @Autowired
    private CommonService commonService;

    @RequestMapping(value = "/about", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String about(HttpServletRequest request) {
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

        // 返回服务端渲染后的结果
        // 直接返回html
        Map<String, Object> resultMap = vueRenderer.renderContent(httpContext, request);
        return VueUtil.resultMapToString(resultMap);
    }
}
