const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
 
const Op = db.Sequelize.Op;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//getAll User

exports.getAllUser = (req,res,next) => {
  User.findAll({
    attributes: { exclude: ['password', 'email']}
  }).then(data =>{
      res.status(200).send(data);
  });
}

//delete

exports.deleteUser = (req, res, newxt)=> {
  const id = req.params.profileId;
  User.destroy({
    where:
    {
      id: id
    }
  }).then(()=> {
    res.status(200).send('User deleted Successfully ID = ' +id);
  })
}

//Sign up
exports.signup = (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");
  
  User.create({
    username: req.body.users.username,
    password: bcrypt.hashSync(req.body.users.password, 8),
    company: req.body.users.company,
    departement: req.body.users.departement,
    monitor: req.body.users.monitor,
    control: req.body.users.control,
    config: req.body.users.config
    
  }).then(user => {
    Role.findAll({
      where: {
      name: {
        [Op.or]: req.body.users.role
        }
      }
    }).then(roles => {
      user.setRoles(roles).then(() => {
        res.send("User registered successfully!");
            });
    }).catch(err => {
      res.status(500).send("Error -> " + err);
    });
  }).catch(err => {
    res.status(500).send("Fail! Error -> " + err);
  })
}

//Sign in
exports.signin = (req, res) => {
  console.log("Sign-In");
  
  User.findOne({
    where: {
      username: req.body.users.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.users.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null, reason: "Invalid Password!" });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({"user":{ auth: true, token: token, role: user.role, username: user.username, monitor: user.monitor, control: user.control, config: user.config }});
    
  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}

// Update Password
exports.updatePass = (req, res) => {
  console.log("Update Password");

  User.findOne({
    where: {
      Id: req.params.profileId
    }
  }).then(user=> {
    var passwordlama =  bcrypt.compareSync(req.body.users.old_password, user.password);
    if (!passwordlama){
      return res.status(401).send({ update: false, reason: "The Old Password entered was invalid"});
    }
    passwordbaru = bcrypt.hashSync(req.body.users.new_password, 8)
    // user.update({password: passwordbaru}).success(res.send("User Changed Password successfully!"));
    user.update({password: passwordbaru}).then(()=> {
      res.status(200).send("Password Updated");
    });
    
  });
}


// exports.updatePass = (req, res) => {
//   console.log("Update Password");

//   User.findOne({
//     where: {
//       id: req.params.profileId
//     }
//   }).then(user=> {
//     var passwordlama =  bcrypt.compareSync(req.body.users.old_password, user.password);
//     if (!passwordlama){
//       return res.status(401).send({ update: false, reason: "The Old Password entered was invalid"});
//     }

//     passwordbaru = bcrypt.hashSync(req.body.users.new_password, 8)
//     // user.update({password: passwordbaru}).success(res.send("User Changed Password successfully!"));
//     user.update({password: passwordbaru}).then(()=> {
//       res.status(200).send("Password Updated");
//     });
    
//   });
// }

//Update Profile
exports.updateProfile = (req, res) => {
  console.log("Update User");

  User.update({
    username: req.body.users.username,
    company: req.body.users.company,
    departement: req.body.users.departement,
    monitor: req.body.users.monitor,
    control: req.body.users.control,
    config: req.body.users.config
  }, { where: {id: req.params.profileId} }).then(user => {
    res.status(200).send("Profile Updated!!!!");
  })
}
 
exports.userContent = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['username'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })
}
 
exports.adminBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['username'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Admin Board",
      "error": err
    });
  })
}
 
exports.managementBoard = (req, res) => {
  User.findOne({
    where: {id: req.userId},
    attributes: ['username'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "Management Board",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access Management Board",
      "error": err
    });
  })
}
