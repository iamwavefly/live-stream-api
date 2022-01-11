export const newUSer = {
  // method of operation
  get: {
    tags: ["user", "new", "signup", "register"], // operation's tag.
    description: "Create a new user", // operation's desc.
    operationId: "newUser", // unique operation id.
    parameters: [""], // expected params.
    // expected responses
    responses: {
      // response code
      201: {
        description: "User created successfully", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo", // Todo model
            },
          },
        },
      },
    },
  },
};
