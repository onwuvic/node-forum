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
    User.hasMany(models.Reply, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'replies'
    });
  };
  return User;
};
