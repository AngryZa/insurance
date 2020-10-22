import wx from "weixin-js-sdk";
import axios from "axios";
import QS from 'qs';
export default function start() {
    console.log(window.location.href);
    var sign_package = {};
    var title = window.title;
    var desc = '';
    var img = encodeURI('http://www.xnftgo.com/case/hxcf/img/share.png');
    axios({
        method: 'post',
        url: './wx_share.php',
        data: QS.stringify({
            url: window.location.href
        })
    }).then((r) => {
        console.log(r);
        sign_package = r;
        if (sign_package.appId) {
            var appId = sign_package.appId;
            var nonceStr = sign_package.nonceStr;
            var timestamp = sign_package.timestamp;
            var signature = sign_package.signature;
            wx.config({
                debug: true,
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            });
            wx.error(function (res) {
                console.log(res);
            });
            // wx.ready(function () {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: sign_package.url,
                imgUrl: img,
                desc: desc, // 分享描述
                success() {
                    alert('分享朋友圈成功');
                    console.log('分享朋友圈成功');
                    // 用户确认分享后执行的回调函数
                },
                cancel() {
                    // 用户取消分享后执行的回调函数
                    alert('分享朋友圈失败');
                    console.log('分享朋友圈失败');
                }
            });
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: sign_package.url,
                imgUrl: img,
                success: function () {
                    alert('分享给朋友成功');
                    console.log('分享给朋友成功');
                },
                cancel: function () {
                    alert('分享给朋友失败');
                    console.log('分享给朋友失败');
                }
            })
            // });
        }
    })
}