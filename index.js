import express, { response } from "express";
import got from "got";
import cheerio from "cheerio";
import bodyParser from "body-parser";
import rp from "request-promise";
import cors from "cors";
import webscrapedData from "./models/webscraperDataModel.js";

const app = new express();
app.use(cors());
app.use(bodyParser.json());
const urlencodedparser = bodyParser.urlencoded({ extended: false });

// Setting the EJS engine for design view
app.set("view engine", "ejs");

app.get("/", urlencodedparser,(req, res) => {
  webscrapedData.find({},(err,webData)=>{
    res.render('index', {
      webDataList : webData
    })
   })
});

// POST method to Send the URL
app.post("/send-url", urlencodedparser, async (req, res) => {
  let url = req.body.myurl;
  console.log(url);
  
    rp(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const textContent = $("body").text();
      const wordCount = textContent.split(" ").length;
      console.log(`The word count is: ${wordCount}`);

      const hrefLinks = [];
      $('a').each(function() {
        hrefLinks.push($(this).attr('href'));
      });

      let medialinks = $("img");
      let link = medialinks.each(function () {
        const src = $(this).attr("src");
        // console.log(`The links in webpage is ${src}`);
      });
      let favourite = false
      webscrapedData.insertMany({ wordCount: wordCount,
        url: url,
        weblinks: hrefLinks,
        medialinks: link, favourite });

        webscrapedData.find({},(err,webData)=>{
          res.render('index', {
            webDataList : webData
          })
         })
    
    }) 
    .catch((err) => {
      console.log(err);
    });
});




// PORT where the server runs
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running successfully on port 3000`);
});
