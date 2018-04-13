(function(global) {
    var util = {
        /** 模板文件缓存 */
        init: function() {
            util.headDom = document.getElementsByTagName('head')[0];
            util.tempUrlCache = {};
            util.scriptCache = {};
            util.cssCache = {};
            util.UrlParams = util.getUrlParams();
        },
        /**
         * url 默认值是当前页面的路径
         * 获取连接上的参数，以对象的方式返回*/
        getUrlParams: function(url) {
            if (!url)
                url = location.search; //获取url中"?"符后的字串 
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(url.indexOf("?") + 1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]); //key=value
                }
            }
            return theRequest;
        },
        /** 获取绝对路径 */
        toAbsURL: function(url) {
            var div = document.createElement('div');
            div.innerHTML = '<a href="' + url.replace(/"/g, '%22') + '"/>';
            return div.firstChild.href;
        },
        /**通过id去寻找temp字符串，得到一个temp function*/
        getTempBySelector: function(Selector) {
            var temp = $(Selector).text();
            return this.getTemp(temp);
        },
        /** 获取模板文件 */
        getTempByUrl: function(url, selector) {
            var temp = null;
            var absUrl = util.toAbsURL(url);
            var tempData = util.tempUrlCache[absUrl];
            if (!tempData) {
                $.ajax({
                    url: url + (url.indexOf("?") == -1 ? "?" : "&") + "v=" + new Date().getTime(),
                    async: false,
                    success: function(data) {
                        tempData = data;
                    },
                    error: function() {
                        app.tipInfo("网络错误,请检查网络连接情况");
                    }
                });

                util.tempUrlCache[absUrl] = tempData;
            }
            temp = util.getTemp($("<div>").append(tempData).find(selector).text());
            return temp;
        },
        /**通过temp字符串，得到一个temp function*/
        getTemp: function(temp) {
            var expList = temp.match(/<@{1}.{0,}?>{1}/ig);
            return function(it) {
                var html = temp;
                if (expList) {
                    for (var i = 0; i < expList.length; i++) {
                        var exp = expList[i];
                        var evalExp = exp.replace(/^<@{1}/, "").replace(/>{1}$/, "").replace(/Eval/g, "_Eval");
                        try {
                            var result = eval(evalExp);
                            html = html.replace(exp, result);
                        } catch (e) {
                            console.error("[" + e.message + "]" + evalExp);
                        }
                    }
                }
                return html;
            }
        },
        getScript: function(url, callback) {
            var absUrl = util.toAbsURL(url);
            if (util.scriptCache[absUrl]) {
                callback();
                return;
            }
            var script = document.createElement('script');    
            script.src = absUrl;    
            script.type = 'text/javascript';    
            util.headDom.appendChild(script);
            // var scriptDom = $("<script>");
            // scriptDom.attr("type", "text/javascript");
            // scriptDom.attr("charset", "utf-8");
            // scriptDom.attr('src', absUrl);
            // util.headDom.append(scriptDom);
            if (typeof callback === 'function') {
                script.onload = script.onreadystatechange = function() {
                    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                        callback();
                        script.onload = script.onreadystatechange = null;
                    }
                };
            }
            util.scriptCache[absUrl] = script;
        },
        getCss: function(url) {
            var absUrl = util.toAbsURL(url);
            if (util.cssCache[absUrl]) {
                return;
            }
            var link = document.createElement('link');
            link.href = absUrl;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            util.headDom.appendChild(link);
            // var linkDom = $("<link>");
            // linkDom.attr("rel", "stylesheet");
            // linkDom.attr("type", "text/css");
            // linkDom.attr('src', absUrl);
            // util.headDom.append(linkDom);
            util.cssCache[absUrl] = link;
        },
        uuid: function() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        }

    };

    util.init();

    global.CPUtil = util;
})(window);