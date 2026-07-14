-- ============================================================================
-- JUSTICA MASTER POSTGRESQL/SUPABASE MIGRATION RUNNER SCRIPT
-- Phase 4B Execution (All 5 Domains - Tables 1 to 26)
-- Target DBMS: PostgreSQL 15+ / Supabase (with pgcrypto extension enabled)
-- ============================================================================

BEGIN TRANSACTION;

-- Enable required PostgreSQL cryptographic extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Execute Domain Migrations sequentially
\ir 01_domain1_identity_rbac_licensing.sql
\ir 02_domain2_consultation_fairclock_sla.sql
\ir 03_domain3_escrow_tax_ledgers_acid.sql
\ir 04_domain4_legal_opinions_worm_emeterai.sql
\ir 05_domain5_probono_disputes_worm_audit.sql

COMMIT TRANSACTION;
