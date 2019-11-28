export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      allowNull: false,
    }
  }, {});

  User.associate = (models) => {
    // association goes here
    User.hasMany(models.Reply, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'replies'
    });
    User.hasMany(models.Thread, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'threads'
    });
    User.hasMany(models.Activity, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'activities'
    });

    // scopes goes here
    User.addScope('defaultScope', {
      attributes: {
        exclude: 'password'
      }
    });

    User.addScope('withPassword', {});
  };
  return User;
};
