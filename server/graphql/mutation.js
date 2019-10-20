const graphql = require('graphql');

const { GraphQLObjectType } = graphql;

const VolunteerResolver = require('./resolvers/Volunteer');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addVolunteer: VolunteerResolver.mutation.addVolunteer,
  }
});

module.exports = Mutation;