const options = require('./data');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
    type options{
        Name:String,
        Short:String
    }
    type Query{
      option(input:String):[options]
    }
`;

const resolvers = {//match the states with state full name or short name
    Query: {
      option: (root,{input}) => options.filter(e=>e.Name.toLowerCase().indexOf(input.toLowerCase()) > -1 || e.Short.toLowerCase().indexOf(input.toLowerCase()) > -1),
    },
  };
  
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
