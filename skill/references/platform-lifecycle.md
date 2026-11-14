# Platform lifecycle: setup, change, release, recovery

## Pick the operating plane

Pawabase Cloud has organizations, projects, teams, plans, and hosted Studio. A project contains isolated environments. The self-hosted runtime is a `pawabase_server` process behind an edge gateway, with database and optional supporting infrastructure. Studio and Cloud account/billing administration are distinct from an environment's app API. Use Cloud docs for organization/project/billing actions and runtime/deployment docs for self-hosting. Do not pass a normal app key to `/studio`.

Each environment has its own database rows, users, file objects, definitions, keys, secrets, and settings. Copying a new environment or preview copies definitions and some settings, but not rows, files, users, secrets, or old keys. Previews have their own keys and expiry, and their public API reference is off by default in the checked docs. Seed only the data a test needs.

## Define and change a backend

Use Studio for interactive changes, or the separate `pawabase-iac` package for versioned definitions. The documented IaC workflow is `pawabase validate` (offline), `pawabase emulate` (simulated), `pawabase plan` (reads real environment), then `pawabase deploy` (writes). `merge` mode preserves unmanaged definitions; `override` can remove definitions absent from code. IaC does not yet manage all environment-level settings such as auth providers, API keys, domains, alarms, and backup schedules. Its command is `pawabase` (`init`, `validate`, `emulate`, `plan`, `deploy`, `whoami`); the Python client ships no command of its own.

A resource definition change can create a pending physical migration. Review the migration SQL and risk notes before applying. Auto-safe additions and destructive retypes/drops are different cases. For a required new field on a populated table, stage nullable/add, backfill, then enforce the requirement. For an external SQL change, inspect schema drift and any cache or change-capture effects.

## Release without breaking clients

Promote tested definitions from development through staging to production; this does not move rows, files, users, keys, or secrets. Use API versions when old and new clients need simultaneous contracts. `/rest/v1` remains the live v1; `/rest/v2` and later can serve different definitions over the **same physical tables and data**. A new version may add tables/columns/indexes but cannot rename, retype, or remove data structures that a live version uses. A version name is never reused. Check Activity traffic before retiring a version. Use a preview environment for PR or risky migration rehearsal.

## Back up and restore

Environment backups can contain definitions, settings, users/access, and rows, with selectable parts. They exclude raw API keys, secret values, stored file bytes, sessions, logs, and job history. Back up underlying object storage separately. A backup with users contains password hashes and needs private handling. A restore can merge or replace; replace deletes current state in selected parts, so inspect the target and save its current state first. Test recovery in a non-production environment before relying on it.

## Operate and recover

Use Activity, request ids, audit history, flow runs, jobs, webhook deliveries, mail logs, realtime connections, alarms, and status pages to determine scope and cause. Distinguish a broken request from asynchronous work that failed after the request returned. For an incident, identify affected environment/version, contain the failure (rollback definition, pause mail, disable schedule/webhook, or use maintenance mode when justified), fix the cause, then replay only the failed work whose side effects are safe to repeat. Check capacity and plan limits before attributing `429` to an application bug.

Read `cloud/overview.mdx`, `environments/overview.mdx`, `environments/previews.mdx`, `environments/promote.mdx`, `environments/api-versions.mdx`, `tools/iac/overview.mdx`, `tools/iac/plan-and-deploy.mdx`, `backups/overview.mdx`, `backups/restore.mdx`, `guides/production-checklist.mdx`, and `activity/overview.mdx` in the docs repo. For self-hosting, read the runtime repository's `ARCHITECTURE.md`, `deploy/README.md`, and deployment-specific configuration before changing infrastructure.
