module.exports = {
    schema: [
        {
            'https://dev-gql.meem.wtf/v1/graphql': {
            // 'https://alpha-gql.meem.wtf/v1/graphql': {
                headers: {
                    'x-hasura-admin-secret': process.env.HASURA_SECRET
                },
            },
        },
    ],
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    overwrite: true,
    generates: {
        './src/generated/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations'
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false,
            },
        },
        './src/generated/graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};