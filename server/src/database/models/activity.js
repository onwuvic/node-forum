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

  // eslint-disable-next-line no-unused-vars
  Activity.associate = (models) => {
  };
  return Activity;
};
