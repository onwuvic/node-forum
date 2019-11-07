export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Channel.associate = (models) => {
    Channel.hasMany(models.Thread, {
      foreignKey: 'channelId',
      sourceKey: 'id',
      as: 'threads'
    });
  };
  return Channel;
};
