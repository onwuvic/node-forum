export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    threadId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  // eslint-disable-next-line no-unused-vars
  Reply.associate = (models) => {
    // associations can be defined here
  };
  return Reply;
};
