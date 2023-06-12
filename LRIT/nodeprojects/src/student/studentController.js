var studentService = require('./studentService');
const nodemailer = require('nodemailer');
var createStudentControllerFn = async (req, res) => 
{
    try
    {
    console.log(req.body);
    var status = await studentService.createStudentDBService(req.body);
    console.log(status);

    if (status) {
        // Envoyer l'email de confirmation
        sendConfirmationEmail(req.body);
        res.send({ "status": true, "message": "Thesard created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating Thesard" });
    }
}
catch(err)
{
    console.log(err);
}
}

var loginUserControllerFn = async (req, res) => {
    var result = null;
    try {
        result = await studentService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
 
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var sendConfirmationEmail = async (student) => {
    const transporter = nodemailer.createTransport({
      // Configuration des informations de votre service de messagerie
      service: 'gmail',
      auth: {
        user: 'elbririhafida@gmail.com',
        pass: 'kythvetdhzfhmxfl',
      },
    });

 const studentId = await studentService.getStudentIdByEmail(student.email);
  const confirmationLink = `http://localhost:4200/inscriptionconfirme/${studentId}`;

     const mailOptions = {
      from: 'elbririhafida@gmail.com',
      to: student.email,
      subject: 'Confirmation d\'inscription',
      text: `Cher ${student.firstname} ${student.lastname},\n\nBienvenue à notre Laboratoire de Thesard. Pour confirmer votre inscription, cliquez sur ce lien : ${confirmationLink}`,
          };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email de confirmation envoyé : ' + info.response);
      }
    });
  }
//recuperer l'etudiant depant de l'email------------------------------------------------------------------------
  var getStudentByEmailControllerFn = async (req, res) => {
    try {
      const email = req.params.email;
      var student = await studentService.getStudentByEmailDBService(email);
      res.json(student);
      console.log(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'étudiant' });
    }
  }
  //methode pour faire une mise a jour au info de thesad----------------------------------------------------------
  var updateStudentControllerFn = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
  
      var status = await studentService.updateStudentById(id, data);
      if (status) {
        res.send({ status: true, message: 'Student updated successfully' });
      } else {
        res.send({ status: false, message: 'Error updating student' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while updating the student' });
    }
  };

  
//faire recuperer tous les thesards
  var getDataConntrollerfn = async (req, res) =>
  {
      var students = await studentService.getDataFromDBService();
      res.send({ "status": true, "data": students });
  }
  var getArchiveDataController = async (req, res) => {
    try {
      var archiveData = await studentService.getArchiveDataFromDBService();
      res.send({ "status": true, "data": archiveData });
    } catch (error) {
      console.log(error);
      res.send({ "status": false, "message": "Error retrieving archive data" });
    }
  };
  var archiveAndDeleteStudentControllerFn = async (req, res) => {
    try {
      const email = req.params.email;
      const result = await studentService.archiveAndDeleteStudentDBService(email);
  
      if (result.status) {
        res.send({ status: true, message: result.message });
      } else {
        res.send({ status: false, message: result.message });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'archivage et de la suppression de l\'étudiant' });
    }
  };

  var getStudentByIdControllerFn = async (req, res) => {
    const id = req.params.id;
    console.log('ITTTTTTTTTTTTTTTD:', id);
    try {
      const student = await studentService.getStudentByIdDBService(id);
      console.log('Student:', student);
      res.json(student);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des informations de l\'étudiant' });
    }
  };

 // les méthodes existantes
module.exports = { createStudentControllerFn, loginUserControllerFn, sendConfirmationEmail, getStudentByEmailControllerFn, updateStudentControllerFn, getDataConntrollerfn, archiveAndDeleteStudentControllerFn, getStudentByIdControllerFn, getArchiveDataController };