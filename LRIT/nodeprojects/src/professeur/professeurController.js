var professeurService = require('./professeurService');
const nodemailer = require('nodemailer');
//------------ Fonction pour créer un professeur-----------------------------------
var createProfesseurControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await professeurService.createProfesseurDBService(req.body);
    console.log(status);

    if (status) {
        res.send({ "status": true, "message": "Profeseeur created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating Professeur" });
    }
}
catch(err)
{
    console.log(err);
}
}


// -----------Fonction pour récupérer tous les professeurs--------------------------
var getDataConntrollerfn = async (req, res) =>
  {
      var professeurs = await professeurService.getDataFromDBService();
      res.send({ "status": true, "data": professeurs });
  }
//-------------------------Fonction pour récupérer tousles archives de professeurs------------
var getArchiveProfesseurDataController = async (req, res) => {
    try {
      var archiveData = await professeurService.getArchiveProfesseurDataFromDBService();
      res.send({ "status": true, "data": archiveData });
    } catch (error) {
      console.log(error);
      res.send({ "status": false, "message": "Error retrieving archive data" });
    }
  };
  
  //-------------------Fonction pour l'archive les professeurs ------------------
  var archiveAndDeleteProfesseurControllerFn = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await professeurService.archiveAndDeleteProfesseurDBService(email);
  
      if (result.status) {
        res.send({ status: true, message: result.message });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'archivage et de la suppression de l\'professer' });
    }
  };
   

// Export des méthodes du contrôleur
module.exports = { createProfesseurControllerFn, getDataConntrollerfn, archiveAndDeleteProfesseurControllerFn, getArchiveProfesseurDataController };