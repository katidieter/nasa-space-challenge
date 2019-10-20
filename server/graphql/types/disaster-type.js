const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const DisasterType = new GraphQLObjectType({
  name: 'Disaster',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type : GraphQLString },
    categories: { type: new GraphQLList(GraphQLString) },
    geometries: {
      date: { type: GraphQLString },
      latitude: { type: GraphQLInt },
      longitude: { type: GraphQLInt },
    }
  })
});

module.exports = DisasterType;