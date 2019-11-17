export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    favorableId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    favorableType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Favorite.prototype.getItem = () => this[
    `get${
      this.get('favorableType')[0]
        .toUpperCase()
    }${this.get('favorableType').substr(1)}`
  ]();

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Reply, {
      foreignKey: 'favorableId',
      constraints: false,
      as: 'reply'
    });
  };
  return Favorite;
};
