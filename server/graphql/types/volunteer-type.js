const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = graphql;

const VolunteerType = new GraphQLObjectType({
  name: 'Volunteer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type : GraphQLString },
    age: { type: GraphQLInt },
  })
});

module.exports = VolunteerType;