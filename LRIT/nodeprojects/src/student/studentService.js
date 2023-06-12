var studentModel = require('./studentModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);
const archiveModel = require('./archiveModel');


module.exports.createStudentDBService = (studentDetails) => {
   var studentModelData = new studentModel();

   studentModelData.firstname = studentDetails.firstname;
   studentModelData.lastname = studentDetails.lastname;
   studentModelData.email = studentDetails.email;
   studentModelData.cne = studentDetails.cne;
   var encrypted = encryptor.encrypt(studentDetails.password);
   studentModelData.password = encrypted;
   studentModelData.these = studentDetails.these;
   studentModelData.datedebut = new Date(studentDetails.datedebut);
   studentModelData.etat = studentDetails.etat;
   studentModelData.role = studentDetails.role;
   console.log(studentModelData.datedebut);
   console.log('datedebut:', studentDetails.datedebut);

   const now = new Date(Date.now());
   console.log('now:', now);
   const studentStartDate = new Date(studentDetails.datedebut);

   const diffTime = now.getTime() - studentStartDate.getTime();

   console.log(diffTime);

   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
   console.log(diffDays);
   // Formater la durée
   let duration = '';
   if (diffDays >= 30 && diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      const remainingDays = diffDays % 30;
      duration = `${months} mois ${remainingDays} jours`;
   } else if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      const remainingMonths = Math.floor((diffDays % 365) / 30);
      const remainingDays = (diffDays % 365) % 30;
      duration = `${years} an(s) ${remainingMonths} mois ${remainingDays} jours`;
   } else {
    duration = `${diffDays} jour(s)`;
   }

   studentModelData.duree = duration;

   
   return studentModelData.save()
      .then(result => {
         return true;
      })
      .catch(error => {
         return false;
      });
}

module.exports.loginuserDBService = (studentDetails) => {
    return studentModel.findOne({ email: studentDetails.email })
        .then(result => {
            if (result) {
                var decrypted = encryptor.decrypt(result.password);
                if (decrypted === studentDetails.password) {
                    return { status: true, msg: "Thesard Validated Successfully" };
                } else {
                    throw { status: false, msg: "Thesard Validation Failed" };
                }
            } else {
                throw { status: false, msg: "Invalid Email or Password" };
            }
        })
        .catch(error => {
            throw error;
        });
}
 
//recuperer depuis MongoDB depant de l'email

module.exports.getStudentByEmailDBService = async (email) => {
    try {
      var student = await studentModel.findOne({ email: email }).exec();
      console.log(student);
      return student;
    } catch (error) {
      throw error;
    }
  }
 

module.exports.updateStudentById = async (id, data) => {
    try {
      const student = await studentModel.findById(id);
      if (!student) {
        return false; // Étudiant non trouvé
      }
  
      // Mettez à jour les nouvelles propriétés du formulaire
      if (data.dateBirth) {
        student.dateBirth = data.dateBirth;
      }
      if (data.age) {
        student.age = data.age;
      }
      if (data.tele) {
        student.tele = data.tele;
      }
  
      await student.save();
      return true; // Mise à jour réussie
    } catch (error) {
      console.log(error);
      return false; // Erreur lors de la mise à jour
    }
}
  
//recuperer depuis MongoDB
module.exports.getDataFromDBService = async () => {
  try {
    const result = await studentModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports.archiveAndDeleteStudentDBService = async (email) => {
  try {
    // Récupérer l'étudiant à archiver
    const student = await studentModel.findOne({ email: email });

    if (!student) {
      return { status: false, message: 'Étudiant non trouvé' };
    }

    // Créer une instance du modèle d'archive avec les données de l'étudiant
    const archiveData = new archiveModel(student.toObject());

    // Enregistrer l'étudiant archivé dans la collection "archives"
    const archivedStudent = await archiveData.save();

    if (!archivedStudent) {
      return { status: false, message: 'Erreur lors de l\'archivage de l\'étudiant' };
    }

    // Supprimer l'étudiant de la collection "students"
    const deletedStudent = await studentModel.findOneAndDelete({ email: email });

    if (!deletedStudent) {
      return { status: false, message: 'Erreur lors de la suppression de l\'étudiant' };
    }

    return { status: true, message: 'Étudiant archivé et supprimé avec succès' };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports.getStudentIdByEmail = async (email) => {
  try {
    const student = await studentModel.findOne({ email: email }).exec();
    return student._id; // Récupérer l'ID de l'étudiant à partir du champ "_id" de l'objet student
  } catch (error) {
    throw error;
  }
}

module.exports.getStudentByIdDBService = async (id) => {
  try {
    const student = await studentModel.findById(id);
    return student;
  } catch (error) {
    throw error;
  }
};
module.exports.getArchiveDataFromDBService= async () => {
  try {
    const result = await archiveModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};