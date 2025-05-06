# JWT-Token Forgery

This task which demonstrates how improper handling of configuration files can lead to critical security vulnerabilities.

This laboratory demonstrates a common misconfiguration: exposing the .env file, which contains the secret used to sign authentication tokens.

Your mission is to extract the JWT_SECRET from the exposed .env file, forge a valid admin token, and access restricted information via the admin interface.

Requirements: A browser, jwt.io, and a basic understanding of how JWT authentication works.

Laboratory files can be reset from [here](localhost:3001/reset).

Proceed to [app](localhost:3000).
