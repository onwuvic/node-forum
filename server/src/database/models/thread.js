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
    // associate defination
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
    Thread.hasMany(models.Activity, {
      foreignKey: 'subjectId',
      constraints: false,
      as: 'activities',
      scope: {
        subjectType: 'thread'
      }
    });

    // scopes definition
    Thread.addScope('all', {
      include: [
        {
          model: models.Channel,
          as: 'channel'
        },
        {
          model: models.Reply,
          as: 'replies',
          attributes: []
        },
      ],
      attributes: {
        include: [[sequelize.fn('count', sequelize.col('replies.id')), 'replyCount']]
      },
      group: ['Thread.id', 'channel.id'],
      order: [['createdAt', 'DESC']]
    });

    Thread.addScope('byChannel', channelId => ({
      where: { channelId },
    }));

    Thread.addScope('byUser', userId => ({
      where: { userId },
    }));

    Thread.addScope('byPopular', {
      include: [
        {
          model: models.Channel,
          as: 'channel'
        },
        {
          model: models.Reply,
          as: 'replies',
          attributes: []
        },
      ],
      attributes: {
        include: [[sequelize.fn('count', sequelize.col('replies.id')), 'replyCount']]
      },
      group: ['Thread.id', 'channel.id'],
      order: [[sequelize.fn('count', sequelize.col('replies.id')), 'DESC']]
    });
  };

  return Thread;
};
