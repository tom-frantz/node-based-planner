import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8080/query",
    documents: "src/apollo/**/*.tsx",
    generates: {
        "src/generated/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql",
            },
        },
        // Useful if you need it, not if you don't.
        // "./graphql.schema.json": {
        //     plugins: ["introspection"],
        // },
    },
    ignoreNoDocuments: true,
};

export default config;
