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
    },
    channelId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});

  Thread.associate = (models) => {
    Thread.hasMany(models.Reply, {
      foreignKey: 'threadId',
      sourceKey: 'id',
      as: 'replies'
    });
    Thread.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'creator'
    });
    Thread.belongsTo(models.Channel, {
      foreignKey: 'channelId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      as: 'channel'
    });
  };
  return Thread;
};
