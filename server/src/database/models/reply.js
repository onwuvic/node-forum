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

  Reply.associate = (models) => {
    Reply.belongsTo(models.Thread, {
      foreignKey: 'threadId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'thread'
    });

    Reply.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };
  return Reply;
};
