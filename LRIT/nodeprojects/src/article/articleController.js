var articleService = require('./articleService');

var createArticleControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await articleService.createArticleDBService(req.body);
    console.log(status);

    if (status) {
        // Envoyer l'email de confirmation
        res.send({ "status": true, "message": "article created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating article" });
    }
}
catch(err)
{
    console.log(err);
}
}
module.exports = { createArticleControllerFn };

// Retrieve all articles
var getDataConntrollerfn = async (req, res) => {
  var articles = await articleService.getDataFromDBService();
  res.send({ "status": true, "data": articles });
};

module.exports = { createArticleControllerFn, getDataConntrollerfn };