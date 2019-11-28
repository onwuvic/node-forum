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
  }, {});

  Activity.prototype.getItem = () => this[
    `get${
      this.get('subjectType')[0]
        .toUpperCase()
    }${this.get('subjectType').substr(1)}`
  ]();

  // eslint-disable-next-line no-unused-vars
  Activity.associate = (models) => {
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
  };
  return Activity;
};
