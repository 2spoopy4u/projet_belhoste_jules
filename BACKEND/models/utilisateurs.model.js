module.exports = (sequelize, Sequelize) => {
  const Utilisateurs = sequelize.define("utilisateurs", {
 
    nom: {
      type: Sequelize.STRING,
      allowNull: false
    },
    prenom: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },  
    mail: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },   
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pass: {
        type: Sequelize.STRING,
    }
 });
return Utilisateurs;
};
