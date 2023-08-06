import { Sequelize, DataTypes, Model } from "sequelize"
import type { Movie } from "@/services/tmdb"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
})

const MovieModel = sequelize.define<Model<Movie, Movie>>("Movie", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  overview: {
    type: DataTypes.STRING,
  },
  posterPath: {
    type: DataTypes.STRING,
  },
  releaseDate: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  voteAverage: {
    type: DataTypes.FLOAT,
  },
  voteCount: {
    type: DataTypes.INTEGER,
  },
  popularity: {
    type: DataTypes.FLOAT,
  },
})

// Normally, you would use migrations to create the table. However, in the sake
// of simplicity and saving time, we are using synchronizations instead.
MovieModel.sync({ alter: true })

export { MovieModel }
export default sequelize
