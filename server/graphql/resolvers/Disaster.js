const graphql = require('graphql');

const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
 } = graphql;

const DisasterType = require('../types/disaster-type');

module.exports = {
  query: {
    disasters: {
      type: DisasterType,
      args: {
        latitude: { type: GraphQLInt },
        longitude: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return "oi";//Volunteer.findById(args.id);
      }
    },
    volunteers: {
      type: new GraphQLList(DisasterType),
      resolve(parent, args) {
        return [];//Volunteer.find();
      }
    },
  },
}