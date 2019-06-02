var express = require('express');
var router = express.Router();

var rp = require('request-promise');

router.get('/', (req, response) => {

  let keyword = req.query.keyword

  function url_encode(url) { //nodejs网址参数不能识别中文字符，必须进行URL转码
    url = encodeURIComponent(url);
    url = url.replace(/\%3A/g, ":");
    url = url.replace(/\%2F/g, "/");
    url = url.replace(/\%3F/g, "?");
    url = url.replace(/\%3D/g, "=");
    url = url.replace(/\%26/g, "&");
    return url;
  }

  var url = url_encode('http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=' + keyword + '&page=1&pagesize=20&showtype=1'); //url转码

  var resMusic = [] // 对数据封装后发回前端
    
  rp(url)
    .then(function (res) {
      let musics = JSON.parse(res).data.info
      musics.map(function (item) {
        let music = {
          name: item.songname_original,
          singer: item.singername,
          hash: item.hash
        }
        resMusic.push(music)
      })

      let Len = resMusic.length
      return Len
      // console.log('在处理');
    }).then(function (Len) {
      let i = 0
      let imgArr = []
      resMusic.map(function (item) {
        let hash = item.hash
        let playUrl = `http://www.kugou.com/yy/index.php?r=play/getdata&hash=${hash}`
        i = i + 1

        rp(playUrl)
          .then(function (res) {
            let hashres = JSON.parse(res).data

            imgArr.push(hashres.img)

            item["img"] = hashres.img
            item["playUrl"] = hashres.play_url

            if (imgArr.length == Len) {
              response.send({
                data: resMusic
              })
            }
          })
          .catch(function (err) {
            console.log("歌曲播放地址获取出错");
          })
      })

    })
})

module.exports = router;