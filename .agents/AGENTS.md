# Project-Scoped Rules for Sovera CSR Dashboard

## Git Workflow Directives
- **STRICT REQUIREMENT**: Do NOT execute `git commit` or `git push` under any circumstances unless explicitly requested by the user. All code modifications should remain local in the working directory until the user gives an explicit command to commit/push.

## MANDATORY DATABASE SCHEMA & TABLE INSPECTION DIRECTIVE
- **ZERO TABLE & SCHEMA GUESSING**: Under no circumstances should SQL queries, migrations, or investigation scripts be executed against the database based on assumed or generic table names (e.g. `contacts`, `csr_activities`) or column names (e.g. `published_at`, `title`).
- **INSPECT TABLES & SCHEMA FIRST**: ALWAYS run `\dt *.*` / `\d <table_name>` or inspect model repository files BEFORE executing any exploratory or aggregation SQL queries to verify exact schema namespaces, table names, column names, types, and constraints.


