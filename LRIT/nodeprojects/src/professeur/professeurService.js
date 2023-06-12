var professeurModel = require('./professeurModel');
const archiveModel = require('./archiveProfesseurModel');
const archiveProfesseurModel = require('./archiveProfesseurModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createProfesseurDBService = async (professeurDetails) => {
  try {
    var professeurModelData = new professeurModel();
    professeurModelData.firstname = professeurDetails.firstname;
    professeurModelData.lastname = professeurDetails.lastname;
    professeurModelData.email = professeurDetails.email;
    professeurModelData.cni = professeurDetails.cni;
    if (professeurDetails.password) {
     var encrypted = encryptor.encrypt(professeurDetails.password);
     professeurModelData.password = encrypted;
   }
    professeurModelData.specialite = professeurDetails.specialite;
    professeurModelData.role = professeurDetails.role;
 
    var result = await professeurModelData.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//recuperer depuis MongoDB
module.exports.getDataFromDBService = async () => {
try {
  const result = await professeurModel.find({});
  return result;
} catch (error) {
  throw error;
}
};
module.exports.getArchiveProfesseurDataFromDBService= async () => {
    try {
      const result = await archiveProfesseurModel.find({});
      return result;
    } catch (error) {
      throw error;
    }
  };

module.exports.archiveAndDeleteProfesseurDBService = async (email) => {
  try {
    // Récupérer l'étudiant à archiver
    const professeur = await professeurModel.findOne({ email: email });

    if (!professeur) {
      return { status: false, message: 'professeur non trouvé' };
    }

    // Créer une instance du modèle d'archive avec les données de l'étudiant
    const archiveData = new archiveModel(professeur.toObject());

    // Enregistrer l'étudiant archivé dans la collection "archives"
    const archivedProfesseur = await archiveData.save();

    if (!archivedProfesseur) {
      return { status: false, message: 'Erreur lors de l\'archivage de l\professeur' };
    }

    // Supprimer l'étudiant de la collection "professeurs"
    const deletedProfesseur = await professeurModel.findOneAndDelete({ email: email });

    if (!deletedProfesseur) {
      return { status: false, message: 'Erreur lors de la suppression de l\professeur' };
    }

    return { status: true, message: 'professeur archivé et supprimé avec succès' };
  } catch (error) {
    console.log(error);
    throw error;
     
  }
}