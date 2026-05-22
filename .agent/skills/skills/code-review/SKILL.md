---
name: code-review
description: Reviews code changes for bugs, style issues, and best practices. Use when reviewing PRs or checking code quality.
---

# Code Review Skill

When reviewing code, follow these steps:

## Review checklist

1. **Correctness**: Does the code do what it's supposed to?
2. **Edge cases**: Are error conditions handled?
3. **Style**: Does it follow project conventions?
4. **Performance**: Are there obvious inefficiencies?

## Architecture & Best Practices Checklist

When reviewing Backend / C# code, specifically check for:

- **Immutability of the Tenant**: The tenant ID (`EmpresaId`) must never change after creation.
- **DTOs rule the Application Layer**: API controllers interact solely with DTOs, never directly returning or accepting raw Domain Entities.
- **Dependency Injection**: Always use constructor injection for services, repositories, and configurations (`IOptions`).
- **Asynchronous Code**: Use `async/await` exclusively for database I/O and suffix methods with `Async`.
- **Testing Requirements**:
  - Every functionality must have at least 3 unit tests: good case, incomplete case, and bad case.
  - Every endpoint must have 3 test cases: good case, incomplete case, and bad case.
- **Architecture Principles**: Ensure the code follows SOLID, Clean Architecture, Clean Code, and Domain-Driven Design (DDD) principles.

## DDD & Bounded Context Checklist

- **Bounded Context isolation**: Services and repositories must NOT cross BC boundaries directly. The 3 BCs are `Operacoes`, `Auth`, and `Whatsapp`. Cross-BC access must go through a formal `I*Port` interface (Anti-Corruption Layer).
- **Value Objects over Primitive Obsession**: Fields with business semantics (CPF, CNPJ, Email, CEP, Telefone) must use their respective Value Objects from `Domain/SharedKernel/ValueObjects/`. Never use raw `string` for these.
- **Outbound Ports naming**: Interfaces that represent external services (email, JWT, password hashing, WhatsApp messaging) must be named `I*Port` and live in `Application/Ports/Outbound/`. Never suffix them with `Service`.
- **CQRS separation**: Write operations must have a dedicated `*Command` + `*CommandHandler`. Read operations must have a dedicated `*Query` + `*QueryHandler`. AppServices are facades only — they must delegate to `ISender.Send()`.
- **CancellationToken**: Every `public async` method must accept `CancellationToken ct = default` and propagate it to EF Core and `CommitAsync(ct)`.
- **DomainException over InvalidOperationException**: Domain entities must throw `DomainException` (from `SharedKernel/Exceptions/`), never `InvalidOperationException` or generic exceptions directly.
- **Enforce over CheckRule**: Use `Enforce(bool isValid, string msg)` — throws when `isValid == false`. The old `CheckRule(bool condition, msg)` where `true` triggered the throw is banned.
- **No infrastructure error codes in Application**: PostgreSQL-specific codes (e.g. `"23503"`) must only appear in Infrastructure (`ApplicationDbContext`). The Application layer catches only typed Domain exceptions (`EntityInUseException`, `DomainException`).

## How to provide feedback

- Be specific about what needs to change
- Explain why, not just what
- Suggest alternatives when possible
