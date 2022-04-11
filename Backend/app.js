const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
var developers = {

    gcnit : {
        "id": "gcnit",
        "avatar_url": "https://avatars.githubusercontent.com/u/4833751?v=4",
        "name": "Gaurav Chandak",
        "company": "workat.tech",
        "blog": "https://workat.tech",
        "location": "Bangalore, India",
        "email": null,
        "bio": "Building workat.tech;\r\nPreviously Software Engineer at @Flipkart, @microsoft and @tracxn",
        "github_id": "gcnit",
        "linkedin_id": "gcnit",
        "codechef_id": "gc_nit",
        "hackerrank_id": "gcnit",
        "twitter_id": "gc_nit",
        "medium_id": "gc_nit",
        "repos": [{
            "name": "awesome-learn-to-code",
            "html_url": "https://github.com/gcnit/awesome-learn-to-code",
            "description": "A list of awesome resources for learning to code",
            "updated_at": "2020-08-12T18:21:53Z"
    }]
    }
    };

var temp = {
        "id": "gcnit",
        "avatar_url": "https://avatars.githubusercontent.com/u/4833751?v=4",
        "name": "Gaurav Chandak",
        "company": "workat.tech",
        "blog": "https://workat.tech",
        "location": "Bangalore, India",
        "email": null,
        "bio": "Building workat.tech;\r\nPreviously Software Engineer at @Flipkart, @microsoft and @tracxn",
        "github_id": "gcnit",
        "linkedin_id": "gcnit",
        "codechef_id": "gc_nit",
        "hackerrank_id": "gcnit",
        "twitter_id": "gc_nit",
        "medium_id": "gc_nit",
        "repos": [{
            "name": "awesome-learn-to-code",
            "html_url": "https://github.com/gcnit/awesome-learn-to-code",
            "description": "A list of awesome resources for learning to code",
            "updated_at": "2020-08-12T18:21:53Z"
    }]
    };

repos = [];

var data='';
var repo = {
    "name": "awesome-learn-to-code",
    "html_url": "https://github.com/gcnit/awesome-learn-to-code",
    "description": "A list of awesome resources for learning to code",
    "updated_at": "2020-08-12T18:21:53Z"
};

app.all('/api/developers', (req, res,next) => {

    if(req.method == "GET"){
        res.send(developers);
    }

    else if(req.method == "POST"){
        
        console.log(req.body);
        res.send("post request completed")
    }

    next();
});


app.get("/api/developers/:id", (req,res) => {

    res.send(developers[req.params.id]);
})

app.delete('api/developers/:id', (req,res) => {
    console.log(delete developers[req.params.id]);
    res.send(developers);
})

app.get("/api/github/:id", (req,res) => {

    data = fetch(`https://api.github.com/users/${req.params.id}`).then(
        (response) => {return response.json();}
    ).then(
        (data) => {
            temp["id"] = req.params.id;
            temp["avatar_url"] = data["avatar_url"];
            temp["name"] = data["name"];
            temp["company"] = data["company"];
            temp["blog"] = data["blog"];
            temp["location"] = data["location"];
            temp["bio"] = data["bio"];
            temp["email"] = data["email"];
            return temp;
        }
    ).then(
        (temp) => {
            data = data = fetch(`https://api.github.com/users/${req.params.id}/repos`).then(
                (response) => {return response.json();}
            ).then(
                (data) =>{
                    Object.entries(data).forEach(([key, value]) => {

                        repo = {};
                        
                        repo["name"] = value["name"];
                        repo["html_url"] = value["html_url"];
                        repo["description"] = value["description"];
                        repo["updated_at"] = value["updated_at"];
                        
                        repos.push(repo);
                        
                    } );
                    
                    temp["repos"] = repos;
                    developers[temp["id"]] = temp;
                    res.send(developers);

                }
            )
        }
    )
})






app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});