const { gql } = require('apollo-server');


module.exports = gql`
    type Return {
        id: ID!
        taxFileNumber: String!
        user: String!
        createdAt: String!
    }

    type Query {
        getReturns: [Return]
    }
`