const graphql = require('graphql');
const Volunteer = require('../../models/volunteer');

const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
 } = graphql;

const VolunteerType = require('../types/volunteer-type');

module.exports = {
  query: {
    volunteer: {
      type: VolunteerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Volunteer.findById(args.id);
      }
    },
    volunteers: {
      type: new GraphQLList(VolunteerType),
      resolve(parent, args) {
        return Volunteer.find();
      }
    },
  },
  mutation: {
    addVolunteer: {
      type: VolunteerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        let volunteer = new Volunteer({
          name: args.name,
          age: args.age
        });
        return volunteer.save();
      }
    },
  }
}