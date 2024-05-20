const axios = require('axios');
const cheerio = require('cheerio');

exports.name = '/instagram/downloadpost';
const snapsave = async (url) => {
  try {
    const ig_regex = /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|reels|tv|stories)\/([^/?#&]+)).*/g;
    if (!url.match(ig_regex)) {
      return "Link Url not valid";
    }
    const decodeSnapApp = ([h, u, n, t, e, r]) => {
      const decode = (d, e, f) => {
        const g = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/".split("");
        const h = g.slice(0, e);
        const i = g.slice(0, f);
        let j = d.split("").reverse().reduce((a, b, c) => {
          if (h.indexOf(b) !== -1) {
            a += h.indexOf(b) * (Math.pow(e, c));
          }
          return a;
        }, 0);
        let k = "";
        while (j > 0) {
          k = i[j % f] + k;
          j = (j - (j % f)) / f;
        }
        return k || "0";
      };
      r = "";
      for (let i = 0, len = h.length; i < len; i++) {
        let s = "";
        while (h[i] !== n[e]) {
          s += h[i++];
        }
        for (let j = 0; j < n.length; j++) {
          s = s.replace(new RegExp(n[j], "g"), j.toString());
        }
        r += String.fromCharCode(decode(s, e, 10) - t);
      }
      return decodeURIComponent(encodeURIComponent(r));
    };
    const getEncodedSnapApp = (data) => data.split("decodeURIComponent(escape(r))}(")[1].split("))")[0].split(",").map(v => v.replace(/"/g, "").trim());
    const getDecodedSnapSave = (data) => data.split("getElementById(\"download-section\").innerHTML = \"")[1].split("\"; document.getElementById(\"inputData\").remove(); ")[0].replace(/\\(\\)?/g, "");
    const decryptSnapSave = (data) => getDecodedSnapSave(decodeSnapApp(getEncodedSnapApp(data)));
    const formData = new URLSearchParams();
    formData.append("url", url);
    const response = await axios.post("https://snapsave.app/action.php?lang=id", formData, {
      headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://snapsave.app",
        "referer": "https://snapsave.app/id",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"
      }
    });
    const decode = decryptSnapSave(response.data);
    const $ = cheerio.load(decode);
    const results = [];
      $("div.download-items__btn").each((_, ol) => {
        let _url = $(ol).find("a").attr("href");
        if (!/https?:\/\//.test(_url || "")) _url = https://snapsave.app${_url};
        results.push({ url: _url });
      });
    if (!results.length) {
      return "Blank data";
    }
    return results;
  } catch (e) {
    return ${e.message};
  }
};
