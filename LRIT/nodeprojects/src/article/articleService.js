var articleModel = require('./articleModel');

module.exports.createArticleDBService = async (articleDetails, filePath) => {
  try {
    var articleModelData = new articleModel();

    articleModelData.titre = articleDetails.titre;
    articleModelData.description = articleDetails.description;
    articleModelData.fichier = filePath;

    var result = await articleModelData.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


// Retrieve data from MongoDB
module.exports.getDataFromDBService = async () => {
   try {
      const result = await articleModel.find({});
      return result;
   } catch (error) {
      throw error;
   }
};