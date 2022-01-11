const url = `mongodb+srv://LiveSumo:${process.env.DBPassword}@live-sumo-cluster.bbtvv.mongodb.net/Live-snap-db?retryWrites=true&w=majority`;
module.exports = {
  mongoURI: url,
};
