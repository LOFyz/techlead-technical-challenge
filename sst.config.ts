/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "techlead-technical-challenge",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // 1. Networking
    const vpc = new sst.aws.Vpc("Vpc");

    // 2. Databases
    const database = new sst.aws.Postgres("Database", { vpc });

    // 3. Compute Cluster (ECS)
    const cluster = new sst.aws.Cluster("Cluster", { vpc });

    // 4. Microservices (Subgraphs & Gateway)
    
    // Users Subgraph
    const usersSubgraph = cluster.addService("UsersSubgraph", {
      architecture: "arm64",
      image: {
        context: ".",
        dockerfile: "Dockerfile",
        args: { APP_NAME: "users-subgraph" },
      },
      environment: {
        DB_HOST: database.host,
        DB_USER: database.username,
        DB_PASSWORD: database.password,
        DB_NAME: database.database,
      },
    });

    // AI Agent
    const aiAgent = cluster.addService("AiAgent", {
      architecture: "arm64",
      image: {
        context: ".",
        dockerfile: "Dockerfile",
        args: { APP_NAME: "ai-agent" },
      },
      environment: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
      },
    });

    // Gateway (Composes the others)
    const gateway = cluster.addService("Gateway", {
      architecture: "arm64",
      public: true,
      image: {
        context: ".",
        dockerfile: "Dockerfile",
        args: { APP_NAME: "gateway" },
      },
      environment: {
        USERS_SUBGRAPH_URL: usersSubgraph.url,
        // WordPress URL would be here too
      },
    });

    // 5. Frontend (Next.js)
    const web = new sst.aws.Nextjs("Web", {
      path: "apps/web",
      environment: {
        NEXT_PUBLIC_GATEWAY_URL: gateway.url,
      },
    });

    return {
      DatabaseHost: database.host,
      GatewayUrl: gateway.url,
      WebUrl: web.url,
    };
  },
});
