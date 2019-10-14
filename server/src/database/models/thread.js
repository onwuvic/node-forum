export default (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  // eslint-disable-next-line no-unused-vars
  Thread.associate = (models) => {
    // associations can be defined here
  };
  return Thread;
};
