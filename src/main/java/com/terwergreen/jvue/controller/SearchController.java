package com.terwergreen.jvue.controller;

import com.terwergreen.jvue.vendor.vue.VueRenderer;
import com.terwergreen.jvue.vendor.vue.VueUtil;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 搜索
 *
 * @author Terwer
 * @version 1.0
 * 2019/1/10 18:51
 **/
@Controller
public class SearchController {
    private final Log logger = LogFactory.getLog(this.getClass());

    @Autowired
    private VueRenderer vueRenderer;

    @RequestMapping(value = "/s/{k}", produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String search(HttpServletRequest request, @PathVariable String k, String kw) {
        // 设置路由上下文
        Map<String, Object> httpContext = new HashMap<>();
        httpContext.put("url", "/s/" + k);

        // 添加seo
        httpContext.put("title", "搜索");
        Map<String, Object> metaMap = new HashMap<>();
        metaMap.put("keywords", "keywords");
        metaMap.put("description", "description");
        httpContext.put("meta", metaMap);

        logger.info("httpContext=>" + httpContext);

        // 返回服务端渲染后的结果
        Map<String, Object> resultMap = vueRenderer.renderContent(httpContext, request);
        return VueUtil.resultMapToString(resultMap);
    }
}
