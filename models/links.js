module.exports = function(sequelize, DataTypes) {
    var Links = sequelize.define("Links", {
      // The email cannot be null, and must be a proper email before creation
      linkName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      linkURL: {
        type: DataTypes.STRING,
        allowNull: false
      },
      linkType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      linkSubType: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });

    return Links;

}