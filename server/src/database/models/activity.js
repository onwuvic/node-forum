export default (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subjectType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      afterFind: (findResult) => {
        if (!findResult) return;
        // eslint-disable-next-line no-param-reassign
        if (!Array.isArray(findResult)) findResult = [findResult];

        // eslint-disable-next-line no-restricted-syntax
        for (const instance of findResult) {
          if (instance.subjectType === 'thread' && instance.thread !== undefined) {
            delete instance.reply;
            delete instance.dataValues.reply;
            delete instance.favorite;
            delete instance.dataValues.favorite;
          }
          if (instance.subjectType === 'reply' && instance.thread !== undefined) {
            delete instance.thread;
            delete instance.dataValues.thread;
            delete instance.favorite;
            delete instance.dataValues.favorite;
          }
          if (instance.subjectType === 'favorite' && instance.thread !== undefined) {
            delete instance.thread;
            delete instance.dataValues.thread;
            delete instance.reply;
            delete instance.dataValues.reply;
          }
        }
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  Activity.associate = (models) => {
    // associations
    Activity.belongsTo(models.Thread, {
      foreignKey: 'subjectId',
      constraints: false,
      as: 'thread'
    });

    Activity.belongsTo(models.Reply, {
      foreignKey: 'subjectId',
      constraints: false,
      as: 'reply'
    });

    Activity.belongsTo(models.Favorite, {
      foreignKey: 'subjectId',
      constraints: false,
      as: 'favorite'
    });

    // scopes
    Activity.addScope('all', userId => ({
      where: { userId },
      include: [
        {
          model: models.Thread,
          as: 'thread',
          include: [
            {
              model: models.User,
              as: 'creator',
            }
          ],
        },
        {
          model: models.Reply,
          as: 'reply',
        },
        {
          model: models.Favorite,
          as: 'favorite',
        },
      ]
    }));
  };

  return Activity;
};
