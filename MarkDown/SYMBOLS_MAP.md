# SYMBOLS MAP

> GENERATED FILE — jangan edit manual. Kode adalah sumber kebenaran.
> Perbarui: `node Tools/generate_symbol_map.mjs`; verifikasi: `node Tools/generate_symbol_map.mjs --check`.

## Cakupan

- 180 source files dipindai.
- 233 exported TypeScript symbols dalam 156 files.
- 46 core PostgreSQL objects dari 240 deklarasi migrasi.
- 95 policies/triggers tersedia on-demand di `MarkDown/SQL_SECURITY_SYMBOLS.md`.
- Lokasi SQL memakai `S/` = `supabase/migrations/` dan `D/` = `database/migrations/`; `+N` berarti ada N deklarasi lama.
- Migrasi `supabase/` diprioritaskan di atas salinan `database/`; peta deklarasi ini bukan rekonstruksi state database setelah seluruh migrasi.
- Indeks SQL sengaja tidak dimuat agar peta tetap ringkas; cari dengan `rg "CREATE .*INDEX" database supabase` bila diperlukan.
- Kode simbol frontend: `f` function, `v` variable/const, `i` interface, `t` type, `c` class, `e` enum, `d` default, `x` re-export.
- Import internal dipindai tetapi tidak dicetak; gunakan `rg` setelah menemukan simbol sasaran.

## Frontend TypeScript

| File (relatif ke `justifiqa-frontend/src`) | Exported symbols |
| --- | --- |
| App.tsx | 4v App |
| components/BaseLayout.tsx | 12v BaseLayout |
| components/ConsultationBookingModal.tsx | 14v ConsultationBookingModal |
| components/ConsultationSection.tsx | 7i ConsultationSectionProps, 11v ConsultationSection |
| components/DocumentDraftingModal.tsx | 17v DocumentDraftingModal |
| components/Footer.tsx | 4v Footer |
| components/IracCard.tsx | 7i IracCardProps, 12v IracCard |
| components/IracFormCard.tsx | 6i PresetFact, 11i IracFormCardProps, 23v IracFormCard |
| components/IracHeaderSection.tsx | 4v IracHeaderSection |
| components/IracPillarCard.tsx | 3i IracPillarCardProps, 15v IracPillarCard |
| components/IracPresetButtons.tsx | 6f IracPresetButtons |
| components/IracSection.tsx | 8i IracSectionProps, 27v IracSection |
| components/Navbar.tsx | 12v Navbar |
| components/TierSelectorCard.tsx | 12v TierSelectorCard |
| components/TierSelectorHeader.tsx | 6f TierSelectorHeader |
| components/admin/AdminComplianceTab.tsx | 11f AdminComplianceTab |
| components/admin/AdminDisputeCenterTab.tsx | 19f AdminDisputeCenterTab |
| components/admin/AdminHeaderAndTabs.tsx | 5t AdminTabKey, 22f AdminHeaderAndTabs |
| components/admin/AdminSettingsPanel.tsx | 8f AdminSettingsPanel |
| components/admin/AdminVerificationQueueTab.tsx | 11f AdminVerificationQueueTab |
| components/advocate/AdvocateDashboardController.tsx | 5f AdvocateDashboardController |
| components/advocate/AdvocateDashboardTabs.tsx | 22f AdvocateDashboardTabs |
| components/advocate/AdvocateDeliverablePanel.tsx | 12f AdvocateDeliverablePanel |
| components/advocate/AdvocateE2EEChatPanel.tsx | 16f AdvocateE2EEChatPanel |
| components/advocate/AdvocateE2EEHeaderAndSla.tsx | 13f AdvocateE2EEHeaderAndSla |
| components/advocate/AdvocateE2EERoomController.tsx | 16f AdvocateE2EERoomController |
| components/advocate/AdvocateGreetingCard.tsx | 13f AdvocateGreetingCard |
| components/advocate/AdvocateHeaderAndTabs.tsx | 8t AdvocateTabKey, 32f AdvocateHeaderAndTabs |
| components/advocate/AdvocateProBonoPanel.tsx | 12f AdvocateProBonoPanel |
| components/advocate/AdvocateSettingsPanel.tsx | 8f AdvocateSettingsPanel |
| components/advocate/AdvocateWalletPanel.tsx | 12f AdvocateWalletPanel |
| components/advocate/CommandCenterActiveCasesTable.tsx | 13f CommandCenterActiveCasesTable |
| components/advocate/ScheduleManagementCard.tsx | 6t ScheduleDayKey, 7t ScheduleSlots, 20f ScheduleManagementCard |
| components/auth/AdvocateAuthIntro.tsx | 7f AdvocateAuthIntro |
| components/auth/AdvocateAuthPromoPanel.tsx | 9f AdvocateAuthPromoPanel |
| components/auth/AdvocateKycResult.tsx | 11f AdvocateKycResult |
| components/auth/AdvocateLoginForm.tsx | 9f AdvocateLoginForm |
| components/auth/AdvocateRegisterForm.tsx | 10f AdvocateRegisterForm |
| components/auth/AuthPortalHeader.tsx | 8f AuthPortalHeader |
| components/auth/ClientAuthIntro.tsx | 7f ClientAuthIntro |
| components/auth/ClientAuthPromoPanel.tsx | 9f ClientAuthPromoPanel |
| components/auth/ClientLoginForm.tsx | 9f ClientLoginForm |
| components/auth/ClientRegisterForm.tsx | 9f ClientRegisterForm |
| components/client/AccountSettingsTab.tsx | 11f AccountSettingsTab |
| components/client/AdvocateBookingPanel.tsx | 21v AdvocateBookingPanel |
| components/client/AdvocateCatalogCard.tsx | 10v AdvocateCatalogCard |
| components/client/AdvocateCatalogFilters.tsx | 18v AdvocateCatalogFilters |
| components/client/AdvocateCatalogTab.tsx | 11v AdvocateCatalogTab |
| components/client/AdvocateProfileDetailModal.tsx | 16v AdvocateProfileDetailModal |
| components/client/AdvocateProfileDetails.tsx | 7v AdvocateProfileDetails |
| components/client/CheckoutEscrowModal.tsx | 23v CheckoutEscrowModal |
| components/client/CheckoutOrderForm.tsx | 8v CheckoutOrderForm |
| components/client/CheckoutOrderSummary.tsx | 6v CheckoutOrderSummary |
| components/client/CheckoutPaymentInstructions.tsx | 14v CheckoutPaymentInstructions |
| components/client/CheckoutSuccessReceipt.tsx | 8v CheckoutSuccessReceipt |
| components/client/ClientActiveConsultationsTable.tsx | 9v ClientActiveConsultationsTable |
| components/client/ClientCatalogFilterBar.tsx | 5i ClientCatalogFilterBarProps, 12v ClientCatalogFilterBar |
| components/client/ClientCatalogTab.tsx | 6i ClientCatalogTabProps, 14v ClientCatalogTab |
| components/client/ClientDisputeCenterTab.tsx | 16f ClientDisputeCenterTab |
| components/client/ClientGreetingCard.tsx | 12v ClientGreetingCard |
| components/client/ClientHeaderAndTabs.tsx | 16f ClientHeaderAndTabs |
| components/client/ClientHistoryDocumentsTable.tsx | 8v ClientHistoryDocumentsTable |
| components/client/ClientIracHeader.tsx | 5v ClientIracHeader |
| components/client/ClientIracTab.tsx | 6i ClientIracTabProps, 10v ClientIracTab |
| components/client/ClientOverviewTab.tsx | 7i ClientOverviewTabProps, 15v ClientOverviewTab |
| components/client/ClientOverviewTables.tsx | 15v ClientOverviewTables |
| components/client/ClientTabNav.tsx | 17f ClientTabNav |
| components/client/ClientWhistleblowingModal.tsx | 19f ClientWhistleblowingModal |
| components/client/EscrowPaymentForm.tsx | 13v EscrowPaymentForm |
| components/client/EscrowStatusBanner.tsx | 7i EscrowStatusBannerProps, 12v EscrowStatusBanner |
| components/client/ProBonoApplicationForm.tsx | 6v ProBonoApplicationForm |
| components/client/checkoutPricing.ts | 1v formatCurrency, 3v getEscrowTotal |
| components/client/dispute/DisputeCenterHeader.tsx | 11f DisputeCenterHeader |
| components/client/dispute/DisputeFormModal.tsx | 11f DisputeFormModal |
| components/client/dispute/DisputeInvestigationTimeline.tsx | 4f DisputeInvestigationTimeline |
| components/client/dispute/DisputeMonitoringPanel.tsx | 11f DisputeMonitoringPanel |
| components/client/dispute/DisputeTicketTable.tsx | 3f DisputeTicketTable |
| components/client/dispute/disputeData.ts | 1v disputeCategories, 8v investigationLogs |
| components/client/modals/FairClockGuardrailModal.tsx | 8f FairClockGuardrailModal |
| components/client/modals/OfflineConsultationQRModal.tsx | 10f OfflineConsultationQRModal |
| components/client/modals/ReviewRatingModal.tsx | 12f ReviewRatingModal |
| components/client/room/ChatComposer.tsx | 14f ChatComposer |
| components/client/room/ChatTranscript.tsx | 8f ChatTranscript |
| components/client/room/ConsultationInfoPanel.tsx | 11f ConsultationInfoPanel |
| components/client/room/ConsultationRoomHeader.tsx | 16f ConsultationRoomHeader |
| components/client/room/ConsultationViewSwitcher.tsx | 4t ConsultationView, 11f ConsultationViewSwitcher |
| components/client/room/DeliverableVaultPanel.tsx | 12f DeliverableVaultPanel |
| components/client/room/EncryptedChatPanel.tsx | 16f EncryptedChatPanel |
| components/client/room/roomData.ts | 1i ChatMessage |
| components/client/settings/ActiveDevicesTable.tsx | 6f ActiveDevicesTable |
| components/client/settings/PrivacySettingsPanel.tsx | 5f PrivacySettingsPanel |
| components/client/settings/SecuritySettingsPanel.tsx | 5f SecuritySettingsPanel |
| components/common/PreChatMoUModal.tsx | 19f PreChatMoUModal |
| components/consultation/ConsultationBookingForm.tsx | 17f ConsultationBookingForm |
| components/consultation/ConsultationBookingReceipt.tsx | 6f ConsultationBookingReceipt |
| components/document/DocumentDraftActions.tsx | 6f DocumentDraftActions |
| components/document/DocumentDraftPreview.tsx | 6f DocumentDraftPreview |
| components/document/DocumentDraftingForm.tsx | 18f DocumentDraftingForm |
| components/gateway/AdvocateQuickProfile.tsx | 12v AdvocateQuickProfile |
| components/gateway/AdvocateQuickStats.tsx | 3f AdvocateQuickStats |
| components/gateway/HeroSearchSection.tsx | 21v HeroSearchSection |
| components/gateway/NavbarGateway.tsx | 15v NavbarGateway |
| components/gateway/PortalCardItem.tsx | 20v PortalCardItem |
| components/gateway/PortalCardsGrid.tsx | 9v PortalCardsGrid |
| components/gateway/SearchPreviewCard.tsx | 16v SearchPreviewCard |
| components/gateway/TrustBarSection.tsx | 8v TrustBarSection |
| components/gateway/VerifierPanel.tsx | 13v VerifierPanel |
| components/ui/badge.tsx | 50x Badge, 50x badgeVariants |
| components/ui/button.tsx | 66x Button, 66x buttonVariants |
| components/ui/card.tsx | 84x Card, 84x CardHeader, 84x CardFooter, 84x CardTitle, 84x CardAction, 84x CardDescription, 84x CardContent |
| components/ui/input.tsx | 21x Input |
| components/verifier/PublicVerifierFormCard.tsx | 20f PublicVerifierFormCard |
| components/verifier/PublicVerifierHero.tsx | 3f PublicVerifierHero |
| components/verifier/PublicVerifierResult.tsx | 8f PublicVerifierResult |
| data/clientAdvocates.ts | 3v MOCK_ADVOCATES |
| data/clientPortalData.ts | 3v DEFAULT_CLIENT_SESSION_ID, 5v ACTIVE_CONSULTATIONS, 24v HISTORY_DOCUMENTS |
| data/documentDraftingData.ts | 3v DOCUMENT_TEMPLATES |
| hooks/authSessionContext.ts | 5i AuthSessionState, 11v AuthSessionContext |
| hooks/useAuthSession.tsx | 14f AuthSessionProvider |
| hooks/useDocumentDrafting.ts | 7f useDocumentDrafting |
| hooks/useModalLifecycle.ts | 3f useModalLifecycle |
| hooks/usePortalSession.ts | 4f usePortalSession |
| hooks/usePublicVerifier.ts | 9t VerifyStatus, 11t PublicVerificationResult, 17f usePublicVerifier |
| hooks/useRealtimeChat.ts | 7t RealtimeChatStatus, 19f useRealtimeChat |
| hooks/useVaultDelivery.ts | 4f useVaultDelivery |
| lib/supabase.ts | 20v supabase |
| lib/utils.ts | 4f cn |
| pages/AdminDashboardPage.tsx | 10f AdminDashboardPage |
| pages/AdvocateAuthPage.tsx | 15v AdvocateAuthPage |
| pages/AdvocateDashboardPage.tsx | 4f AdvocateDashboardPage |
| pages/AiNavigatorPage.tsx | 10v AiNavigatorPage |
| pages/ClientAuthPage.tsx | 15v ClientAuthPage |
| pages/ClientConsultationRoomPage.tsx | 13f ClientConsultationRoomPage |
| pages/ClientDashboardPage.tsx | 17v ClientDashboardPage |
| pages/ClientDisputeCenterPage.tsx | 7f ClientDisputeCenterPage |
| pages/GatewayPage.tsx | 7x GatewayPage |
| pages/LandingGatewayPage.tsx | 15v LandingGatewayPage |
| pages/PublicDocumentVerifierPage.tsx | 9v PublicDocumentVerifierPage |
| pages/admin/AdminLoginPage.tsx | 10f AdminLoginPage |
| pages/auth/AdvocateLoginPage.tsx | 8x AdvocateLoginPage |
| pages/auth/ClientLoginPage.tsx | 8x ClientLoginPage |
| router/AppRouter.tsx | 28v AppRouter |
| router/PortalProtectedRoute.tsx | 11f PortalProtectedRoute |
| services/consultationService.ts | 15f getAvailableConsultationSlots, 52f checkoutConsultation |
| services/mockConsultationService.ts | 8v TIER_CATALOG, 65v MOCK_ADVOCATE_SLOTS, 98c MockConsultationService |
| services/mockIracService.ts | 8c MockIracService |
| services/portalAuthService.ts | 12f signInPortal, 22f registerPortal, 39f signOutPortal, 44f authErrorMessage |
| services/roomSessionService.ts | 3i RoomSession, 11f resolveRoomSession |
| services/vaultDeliveryService.ts | 4i VaultDocument, 23f getVaultDocument, 41f createVaultDownloadUrl, 47f releaseVaultEscrow |
| types/auth.ts | 1t UserRole, 3i AuthSession, 12v DEFAULT_SESSIONS |
| types/authForms.ts | 1t ThemeMode, 2t AuthTab, 3t SyncStatus, 5i ClientLoginFields, 6i ClientRegistrationFields, 7i AdvocateLoginFields, 8i AdvocateRegistrationFields |
| types/client.ts | 4t ClientTabKey, 6i ActiveConsultation, 15i HistoryDocument, 23i ServiceOption, 32i Advocate, 49i TimeSlot, 54i CheckoutDraft |
| types/consultation.ts | 1t ConsultationTierId, 3t EscrowStatus, 5i ConsultationTier, 18i ConsultationSlot, 29i LiveConsultationSlot, 31i ConsultationCheckout, 46i EscrowTransaction, 59i BookingRequest |
| types/database.types.ts | 1t Json, 9t Database, 1637t Tables, 1666t TablesInsert, 1691t TablesUpdate, 1716t Enums, 1733t CompositeTypes, 1750v Constants |
| types/irac.ts | 1t LegalDocumentTemplateId, 3i IracAnalysis, 16i DocumentClause, 22i LegalDocumentDraft |
| types/portalAuth.ts | 3t PortalRole, 5v portalHome, 11v portalLogin, 17f getPortalRole, 22f safePortalRedirect |

## Database PostgreSQL

| Kind | Symbol/signature | Deklarasi pilihan/terbaru |
| --- | --- | --- |
| function | public.fn_assert_service_order_financial_reconciliation() | S/20260722000016_p2_b3_service_orders_expand_only.sql:L439 |
| function | public.fn_book_consultation_slot_mutex( p_slot_id UUID, p_client_id UUID, p_booking_type … | S/20260721000011_fix_plpgsql_mutex_and_worm_functions.sql:L38 +4 |
| function | public.fn_client_checkout_consultation_mutex( p_slot_id UUID, p_case_summary TEXT, p_book… | S/20260721000012_add_authenticated_checkout_rpc_facade.sql:L1 |
| function | public.fn_is_verified_advocate(p_advocate_id UUID) | S/20260721000015_harden_verified_advocate_rls_helper.sql:L1 |
| function | public.fn_mutate_wallet_balance_mutex( p_wallet_id UUID, p_amount NUMERIC, p_mutation_typ… | S/20260721000011_fix_plpgsql_mutex_and_worm_functions.sql:L92 +3 |
| function | public.fn_prevent_worm_mutation() | S/20260721000011_fix_plpgsql_mutex_and_worm_functions.sql:L9 +5 |
| function | public.fn_protect_accepted_service_fee_line() | S/20260722000016_p2_b3_service_orders_expand_only.sql:L383 |
| function | public.fn_protect_payment_milestone_terms() | S/20260722000016_p2_b3_service_orders_expand_only.sql:L406 |
| function | public.fn_record_immutable_audit_log( p_actor_user_id UUID, p_actor_type VARCHAR, p_actio… | S/20260721000011_fix_plpgsql_mutex_and_worm_functions.sql:L212 +3 |
| function | public.fn_refund_escrow_to_client_mutex( p_escrow_id UUID, p_refund_reason TEXT ) | S/20260721000011_fix_plpgsql_mutex_and_worm_functions.sql:L149 +3 |
| function | public.fn_release_escrow_to_advocate_mutex(p_escrow_id UUID) | S/20260721000013_add_realtime_room_and_client_release.sql:L42 +3 |
| function | public.fn_verify_public_legal_document(p_sha256_hash TEXT) | S/20260722000016_p2_b3_service_orders_expand_only.sql:L193 |
| table | advocate_reviews | S/20260715000002_domain2_consultation_fairclock_sla.sql:L162 +1 |
| table | advocate_sanctions_log | S/20260715000001_domain1_identity_rbac_licensing.sql:L225 +1 |
| table | advocate_service_tiers | S/20260715000001_domain1_identity_rbac_licensing.sql:L190 +1 |
| table | audit_logs_worm | S/20260715000005_domain5_probono_disputes_worm_audit.sql:L117 +1 |
| table | booking_sessions | S/20260715000002_domain2_consultation_fairclock_sla.sql:L50 +1 |
| table | case_irac_notes | S/20260715000004_domain4_legal_opinions_worm_emeterai.sql:L145 +1 |
| table | chat_sessions_metadata | S/20260715000002_domain2_consultation_fairclock_sla.sql:L128 +1 |
| table | consultation_slots | S/20260715000002_domain2_consultation_fairclock_sla.sql:L11 +1 |
| table | dispute_cases | S/20260715000005_domain5_probono_disputes_worm_audit.sql:L43 +1 |
| table | dispute_mediator_signatures | S/20260715000005_domain5_probono_disputes_worm_audit.sql:L85 +1 |
| table | document_revisions | S/20260715000004_domain4_legal_opinions_worm_emeterai.sql:L80 +1 |
| table | emeterai_stamping_logs | S/20260715000004_domain4_legal_opinions_worm_emeterai.sql:L112 +1 |
| table | escrow_payout_ledgers | S/20260715000003_domain3_escrow_tax_ledgers_acid.sql:L98 +1 |
| table | escrow_transactions | S/20260715000003_domain3_escrow_tax_ledgers_acid.sql:L12 +1 |
| table | legal_opinions | S/20260715000004_domain4_legal_opinions_worm_emeterai.sql:L27 +1 |
| table | offline_handshakes_totp | S/20260715000002_domain2_consultation_fairclock_sla.sql:L96 +1 |
| table | platform_governance_configs | S/20260715000003_domain3_escrow_tax_ledgers_acid.sql:L168 +1 |
| table | probono_cases | S/20260715000005_domain5_probono_disputes_worm_audit.sql:L12 +1 |
| table | public.payment_milestones | S/20260722000016_p2_b3_service_orders_expand_only.sql:L317 |
| table | public.service_fee_lines | S/20260722000016_p2_b3_service_orders_expand_only.sql:L287 |
| table | public.service_orders | S/20260722000016_p2_b3_service_orders_expand_only.sql:L246 |
| table | sipp_verifications | S/20260715000001_domain1_identity_rbac_licensing.sql:L151 +1 |
| table | tax_pph21_withholdings | S/20260715000003_domain3_escrow_tax_ledgers_acid.sql:L137 +1 |
| table | user_active_devices | S/20260715000001_domain1_identity_rbac_licensing.sql:L122 +1 |
| table | user_notifications | S/20260715000005_domain5_probono_disputes_worm_audit.sql:L153 +1 |
| table | users_admin | S/20260715000001_domain1_identity_rbac_licensing.sql:L97 +1 |
| table | users_advocate | S/20260715000001_domain1_identity_rbac_licensing.sql:L51 +1 |
| table | users_client | S/20260715000001_domain1_identity_rbac_licensing.sql:L14 +1 |
| table | wallet_balances | S/20260715000003_domain3_escrow_tax_ledgers_acid.sql:L70 +1 |
| view | public.frontend_advocate_catalog_v | S/20260721000010_align_frontend_schema_contracts.sql:L138 |
| view | public.frontend_consultation_slots_v | S/20260721000010_align_frontend_schema_contracts.sql:L173 |
| view | public.frontend_escrow_transactions_v | S/20260721000010_align_frontend_schema_contracts.sql:L188 |
| view | public.frontend_irac_analysis_v | S/20260721000010_align_frontend_schema_contracts.sql:L213 |
| view | public.frontend_legal_document_drafts_v | S/20260721000010_align_frontend_schema_contracts.sql:L228 |
