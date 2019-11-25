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
    // associate defination
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

    Reply.hasMany(models.Favorite, {
      foreignKey: 'favorableId',
      constraints: false,
      as: 'favorites',
      scope: {
        favorableType: 'reply'
      }
    });

    Reply.hasMany(models.Activity, {
      foreignKey: 'subjectId',
      constraints: false,
      as: 'activities',
      scope: {
        subjectType: 'reply'
      }
    });
  };
  return Reply;
};
