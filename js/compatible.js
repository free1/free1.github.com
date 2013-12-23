// 浏览器兼容问题 block IE (versions before 9.0)
{
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = {
        version: (userAgent.match(/(?:firefox|opera|safari|chrome|msie)[\/: ]([\d.]+)/))[1],
        safari: /version.+safari/.test(userAgent),
        chrome: /chrome/.test(userAgent),
        firefox: /firefox/.test(userAgent),
        ie: /msie/.test(userAgent),
        opera: /opera/.test(userAgent)
    }
    if ( browser.ie && browser.version < 9 ) {
        alert("Sorry, but this site are not compatible for your web browser(对不起，此博客不兼容您的浏览器)\nPlease use one of these recommended browsers instead(请安装其他高版本浏览器浏览):\n\nGoogle Chrome\nApple Safari\nMozilla Firefox\nMicrosoft Internet Explorer 9.0 or later");
        window.location = "http://www.google.com/chrome";
    }
}
