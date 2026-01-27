## Lab 1: HTTP Authentication Traffic Analysis (Juice Shop)

### Objective
To analyze authentication traffic over HTTP and understand how credentials and tokens
can be exposed at the network level.

### Environment
- Application: OWASP Juice Shop
- Access Method: http://localhost:3000
- Capture Interface: loopback (lo)
- Tool: Wireshark

### Observation
- Login request was sent via HTTP POST to `/rest/user/login`
- User credentials (email and password) were visible in plaintext
- Authentication token was visible in the server response

### Why This Happened
- The application was accessed over HTTP (no TLS encryption)
- Traffic to localhost is routed internally via the loopback interface (`lo`)
- Wireshark captured raw HTTP payloads because no encryption was applied
