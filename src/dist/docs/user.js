"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUSer = void 0;
exports.newUSer = {
    // method of operation
    get: {
        tags: ["user", "new", "signup", "register"],
        description: "Create a new user",
        operationId: "newUser",
        parameters: [""],
        // expected responses
        responses: {
            // response code
            201: {
                description: "User created successfully",
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
//# sourceMappingURL=user.js.map