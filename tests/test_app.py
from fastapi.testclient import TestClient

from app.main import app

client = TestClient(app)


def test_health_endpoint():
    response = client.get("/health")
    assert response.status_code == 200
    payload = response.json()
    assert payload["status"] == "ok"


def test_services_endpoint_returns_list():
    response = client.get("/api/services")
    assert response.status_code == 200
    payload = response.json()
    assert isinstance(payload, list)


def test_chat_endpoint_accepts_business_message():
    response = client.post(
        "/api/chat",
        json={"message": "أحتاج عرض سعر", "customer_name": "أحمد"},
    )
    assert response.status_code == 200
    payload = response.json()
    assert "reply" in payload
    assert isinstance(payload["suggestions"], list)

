# Security Notes

## Principles

- Validate all request payloads using Pydantic models.
- Treat all customer messages as untrusted input.
- Prevent secret leakage by using environment variables.
- Require human review for destructive actions, money movement, refunds, public launches, and contracts.
- Keep audit trails for administrative actions.

## Operational safeguards

- Use SQLite only for local/dev examples.
- Replace with PostgreSQL in production with environment-backed credentials.
- Restrict API access by least privilege.
- Enable secure hosting behind HTTPS in production.
- Monitor logs and audit actions.

## Sensitive operations

The platform explicitly does not process payments, refunds, or binding contractual actions without human approval.
