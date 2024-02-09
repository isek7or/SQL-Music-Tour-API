'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_Time extends Model {
    static associate({ Band, Event, Stage }) {
      // band
      Set_Time.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band'
      });
      // event
      Set_Time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      });
      // stage
      Set_Time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      })
    }
  }
  Set_Time.init({
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Set_Time',
    tableName: 'set_Times',
    timestamps: false,
  });
  return Set_Time;
}
