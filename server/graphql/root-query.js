const graphql = require('graphql');

const {
  GraphQLObjectType,
 } = graphql;

const VolunteerResolver = require('./resolvers/Volunteer');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    volunteer: VolunteerResolver.query.volunteer,
    volunteers: VolunteerResolver.query.volunteers,
  })
});

module.exports = RootQuery;