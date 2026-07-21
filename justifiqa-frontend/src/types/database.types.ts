export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      advocate_reviews: {
        Row: {
          advocate_id: string
          booking_id: string
          client_id: string
          created_at: string
          is_anonymous: boolean
          rating: number
          review_id: string
          review_text: string | null
        }
        Insert: {
          advocate_id: string
          booking_id: string
          client_id: string
          created_at?: string
          is_anonymous?: boolean
          rating: number
          review_id?: string
          review_text?: string | null
        }
        Update: {
          advocate_id?: string
          booking_id?: string
          client_id?: string
          created_at?: string
          is_anonymous?: boolean
          rating?: number
          review_id?: string
          review_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_review_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_review_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_review_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
        ]
      }
      advocate_sanctions_log: {
        Row: {
          advocate_id: string
          issued_at: string
          issued_by_admin_id: string
          reason_text: string
          sanction_id: string
          sanction_type: string
          warning_level: number
        }
        Insert: {
          advocate_id: string
          issued_at?: string
          issued_by_admin_id: string
          reason_text: string
          sanction_id?: string
          sanction_type: string
          warning_level: number
        }
        Update: {
          advocate_id?: string
          issued_at?: string
          issued_by_admin_id?: string
          reason_text?: string
          sanction_id?: string
          sanction_type?: string
          warning_level?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_sanction_admin"
            columns: ["issued_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users_admin"
            referencedColumns: ["admin_id"]
          },
          {
            foreignKeyName: "fk_sanction_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
        ]
      }
      advocate_service_tiers: {
        Row: {
          advocate_id: string
          badge_text: string | null
          description: string | null
          duration_label: string | null
          duration_minutes: number | null
          features: Json
          highlight_color: string
          is_active: boolean
          is_escrow_required: boolean
          price_idr: number
          price_label: string | null
          recommended_for: string | null
          service_code: string | null
          tier_id: string
          tier_level: number
          tier_name: string
        }
        Insert: {
          advocate_id: string
          badge_text?: string | null
          description?: string | null
          duration_label?: string | null
          duration_minutes?: number | null
          features?: Json
          highlight_color?: string
          is_active?: boolean
          is_escrow_required?: boolean
          price_idr: number
          price_label?: string | null
          recommended_for?: string | null
          service_code?: string | null
          tier_id?: string
          tier_level: number
          tier_name: string
        }
        Update: {
          advocate_id?: string
          badge_text?: string | null
          description?: string | null
          duration_label?: string | null
          duration_minutes?: number | null
          features?: Json
          highlight_color?: string
          is_active?: boolean
          is_escrow_required?: boolean
          price_idr?: number
          price_label?: string | null
          recommended_for?: string | null
          service_code?: string | null
          tier_id?: string
          tier_level?: number
          tier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_tier_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
        ]
      }
      audit_logs_worm: {
        Row: {
          action_type: string
          actor_type: string
          actor_user_id: string
          audit_id: string
          created_at: string
          metadata_json: Json
          target_resource: string
          worm_sha256_hash: string
        }
        Insert: {
          action_type: string
          actor_type: string
          actor_user_id: string
          audit_id?: string
          created_at?: string
          metadata_json: Json
          target_resource: string
          worm_sha256_hash: string
        }
        Update: {
          action_type?: string
          actor_type?: string
          actor_user_id?: string
          audit_id?: string
          created_at?: string
          metadata_json?: Json
          target_resource?: string
          worm_sha256_hash?: string
        }
        Relationships: []
      }
      booking_sessions: {
        Row: {
          advocate_first_reply_at: string | null
          advocate_id: string
          booked_price_idr: number
          booking_code: string
          booking_id: string
          case_summary: string | null
          client_id: string
          created_at: string
          fair_clock_started_at: string | null
          meeting_method: string
          slot_id: string
          status: string
          timeout_job_id: string | null
          updated_at: string
        }
        Insert: {
          advocate_first_reply_at?: string | null
          advocate_id: string
          booked_price_idr?: number
          booking_code: string
          booking_id?: string
          case_summary?: string | null
          client_id: string
          created_at?: string
          fair_clock_started_at?: string | null
          meeting_method?: string
          slot_id: string
          status: string
          timeout_job_id?: string | null
          updated_at?: string
        }
        Update: {
          advocate_first_reply_at?: string | null
          advocate_id?: string
          booked_price_idr?: number
          booking_code?: string
          booking_id?: string
          case_summary?: string | null
          client_id?: string
          created_at?: string
          fair_clock_started_at?: string | null
          meeting_method?: string
          slot_id?: string
          status?: string
          timeout_job_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_booking_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_booking_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "fk_booking_slot"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "consultation_slots"
            referencedColumns: ["slot_id"]
          },
        ]
      }
      case_irac_notes: {
        Row: {
          advocate_id: string
          analysis_text: string
          booking_id: string
          case_title: string | null
          conclusion_text: string
          confidence_score: number | null
          created_at: string
          irac_id: string
          issue_text: string
          relevant_articles: Json
          rule_text: string
          story_of_facts: string | null
          worm_hash_sha256: string
        }
        Insert: {
          advocate_id: string
          analysis_text: string
          booking_id: string
          case_title?: string | null
          conclusion_text: string
          confidence_score?: number | null
          created_at?: string
          irac_id?: string
          issue_text: string
          relevant_articles?: Json
          rule_text: string
          story_of_facts?: string | null
          worm_hash_sha256: string
        }
        Update: {
          advocate_id?: string
          analysis_text?: string
          booking_id?: string
          case_title?: string | null
          conclusion_text?: string
          confidence_score?: number | null
          created_at?: string
          irac_id?: string
          issue_text?: string
          relevant_articles?: Json
          rule_text?: string
          story_of_facts?: string | null
          worm_hash_sha256?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_irac_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_irac_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      chat_sessions_metadata: {
        Row: {
          advocate_ephemeral_pubkey: string
          booking_id: string
          chat_session_id: string
          client_ephemeral_pubkey: string
          created_at: string
          key_exchange_salt: string
          zero_knowledge_flag: boolean
        }
        Insert: {
          advocate_ephemeral_pubkey: string
          booking_id: string
          chat_session_id?: string
          client_ephemeral_pubkey: string
          created_at?: string
          key_exchange_salt: string
          zero_knowledge_flag?: boolean
        }
        Update: {
          advocate_ephemeral_pubkey?: string
          booking_id?: string
          chat_session_id?: string
          client_ephemeral_pubkey?: string
          created_at?: string
          key_exchange_salt?: string
          zero_knowledge_flag?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_meta_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      consultation_slots: {
        Row: {
          advocate_id: string
          end_time: string
          is_mutex_locked: boolean
          slot_id: string
          start_time: string
          status: string
          tier_id: string
          updated_at: string
        }
        Insert: {
          advocate_id: string
          end_time: string
          is_mutex_locked?: boolean
          slot_id?: string
          start_time: string
          status?: string
          tier_id: string
          updated_at?: string
        }
        Update: {
          advocate_id?: string
          end_time?: string
          is_mutex_locked?: boolean
          slot_id?: string
          start_time?: string
          status?: string
          tier_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_slot_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_slot_tier"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "advocate_service_tiers"
            referencedColumns: ["tier_id"]
          },
        ]
      }
      dispute_cases: {
        Row: {
          booking_id: string
          created_at: string
          description: string
          dispute_category: string
          dispute_id: string
          escrow_frozen_at: string | null
          escrow_id: string
          evidence_paths: Json
          reported_by_client_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          description: string
          dispute_category: string
          dispute_id?: string
          escrow_frozen_at?: string | null
          escrow_id: string
          evidence_paths?: Json
          reported_by_client_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          description?: string
          dispute_category?: string
          dispute_id?: string
          escrow_frozen_at?: string | null
          escrow_id?: string
          evidence_paths?: Json
          reported_by_client_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispute_cases_reported_by_client_id_fkey"
            columns: ["reported_by_client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "fk_dispute_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_dispute_escrow"
            columns: ["escrow_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["escrow_id"]
          },
        ]
      }
      dispute_mediator_signatures: {
        Row: {
          decision_type: string
          dispute_id: string
          fido2_signature_hash: string
          mediator_admin_id: string
          signature_id: string
          signed_at: string
        }
        Insert: {
          decision_type: string
          dispute_id: string
          fido2_signature_hash: string
          mediator_admin_id: string
          signature_id?: string
          signed_at?: string
        }
        Update: {
          decision_type?: string
          dispute_id?: string
          fido2_signature_hash?: string
          mediator_admin_id?: string
          signature_id?: string
          signed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_signature_admin"
            columns: ["mediator_admin_id"]
            isOneToOne: false
            referencedRelation: "users_admin"
            referencedColumns: ["admin_id"]
          },
          {
            foreignKeyName: "fk_signature_dispute"
            columns: ["dispute_id"]
            isOneToOne: false
            referencedRelation: "dispute_cases"
            referencedColumns: ["dispute_id"]
          },
        ]
      }
      document_revisions: {
        Row: {
          client_feedback_text: string
          opinion_id: string
          revision_id: string
          revision_round: number
          submitted_at: string
        }
        Insert: {
          client_feedback_text: string
          opinion_id: string
          revision_id?: string
          revision_round: number
          submitted_at?: string
        }
        Update: {
          client_feedback_text?: string
          opinion_id?: string
          revision_id?: string
          revision_round?: number
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_revision_opinion"
            columns: ["opinion_id"]
            isOneToOne: false
            referencedRelation: "legal_opinions"
            referencedColumns: ["opinion_id"]
          },
        ]
      }
      emeterai_stamping_logs: {
        Row: {
          opinion_id: string
          peruri_serial_number: string
          sha256_document_hash: string
          stamped_at: string
          stamping_id: string
          status: string
        }
        Insert: {
          opinion_id: string
          peruri_serial_number: string
          sha256_document_hash: string
          stamped_at?: string
          stamping_id?: string
          status?: string
        }
        Update: {
          opinion_id?: string
          peruri_serial_number?: string
          sha256_document_hash?: string
          stamped_at?: string
          stamping_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_emeterai_opinion"
            columns: ["opinion_id"]
            isOneToOne: false
            referencedRelation: "legal_opinions"
            referencedColumns: ["opinion_id"]
          },
        ]
      }
      escrow_payout_ledgers: {
        Row: {
          amount_idr: number
          description: string
          escrow_id: string
          executed_at: string
          ledger_id: string
          mutation_type: string
          wallet_id: string
        }
        Insert: {
          amount_idr: number
          description: string
          escrow_id: string
          executed_at?: string
          ledger_id?: string
          mutation_type: string
          wallet_id: string
        }
        Update: {
          amount_idr?: number
          description?: string
          escrow_id?: string
          executed_at?: string
          ledger_id?: string
          mutation_type?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_ledger_escrow"
            columns: ["escrow_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["escrow_id"]
          },
          {
            foreignKeyName: "fk_ledger_wallet"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallet_balances"
            referencedColumns: ["wallet_id"]
          },
        ]
      }
      escrow_transactions: {
        Row: {
          advocate_id: string
          advocate_payout_ratio: number
          booking_id: string
          client_id: string
          client_payout_ratio: number
          created_at: string
          escrow_id: string
          holding_expires_at: string
          is_mutex_locked: boolean
          mutex_lock_id: string | null
          payment_gateway_ref: string
          resolution_notes: string | null
          status: string
          total_amount_idr: number
          updated_at: string
          worm_audit_hash: string | null
        }
        Insert: {
          advocate_id: string
          advocate_payout_ratio?: number
          booking_id: string
          client_id: string
          client_payout_ratio?: number
          created_at?: string
          escrow_id?: string
          holding_expires_at: string
          is_mutex_locked?: boolean
          mutex_lock_id?: string | null
          payment_gateway_ref: string
          resolution_notes?: string | null
          status: string
          total_amount_idr: number
          updated_at?: string
          worm_audit_hash?: string | null
        }
        Update: {
          advocate_id?: string
          advocate_payout_ratio?: number
          booking_id?: string
          client_id?: string
          client_payout_ratio?: number
          created_at?: string
          escrow_id?: string
          holding_expires_at?: string
          is_mutex_locked?: boolean
          mutex_lock_id?: string | null
          payment_gateway_ref?: string
          resolution_notes?: string | null
          status?: string
          total_amount_idr?: number
          updated_at?: string
          worm_audit_hash?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_escrow_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_escrow_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_escrow_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
        ]
      }
      legal_opinions: {
        Row: {
          advocate_id: string
          booking_id: string
          clauses_jsonb: Json
          client_id: string
          created_at: string
          document_title: string
          opinion_id: string
          opponent_name: string | null
          pdf_storage_path: string
          revision_counter: number
          status: string
          template_id: string | null
          updated_at: string
        }
        Insert: {
          advocate_id: string
          booking_id: string
          clauses_jsonb?: Json
          client_id: string
          created_at?: string
          document_title: string
          opinion_id?: string
          opponent_name?: string | null
          pdf_storage_path: string
          revision_counter?: number
          status: string
          template_id?: string | null
          updated_at?: string
        }
        Update: {
          advocate_id?: string
          booking_id?: string
          clauses_jsonb?: Json
          client_id?: string
          created_at?: string
          document_title?: string
          opinion_id?: string
          opponent_name?: string | null
          pdf_storage_path?: string
          revision_counter?: number
          status?: string
          template_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_opinion_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_opinion_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
          {
            foreignKeyName: "fk_opinion_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
        ]
      }
      offline_handshakes_totp: {
        Row: {
          booking_id: string
          handshake_id: string
          office_lat_long: string
          scanned_at: string
          status: string
          totp_secret_hash: string
        }
        Insert: {
          booking_id: string
          handshake_id?: string
          office_lat_long: string
          scanned_at?: string
          status?: string
          totp_secret_hash: string
        }
        Update: {
          booking_id?: string
          handshake_id?: string
          office_lat_long?: string
          scanned_at?: string
          status?: string
          totp_secret_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_handshake_booking"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking_sessions"
            referencedColumns: ["booking_id"]
          },
        ]
      }
      platform_governance_configs: {
        Row: {
          config_key: string
          config_value: string
          description: string
          updated_at: string
          updated_by_admin_id: string
        }
        Insert: {
          config_key: string
          config_value: string
          description: string
          updated_at?: string
          updated_by_admin_id: string
        }
        Update: {
          config_key?: string
          config_value?: string
          description?: string
          updated_at?: string
          updated_by_admin_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_config_admin"
            columns: ["updated_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users_admin"
            referencedColumns: ["admin_id"]
          },
        ]
      }
      probono_cases: {
        Row: {
          client_id: string
          created_at: string
          dtks_registration_no: string
          probono_id: string
          status: string
          verified_by_admin_id: string | null
        }
        Insert: {
          client_id: string
          created_at?: string
          dtks_registration_no: string
          probono_id?: string
          status?: string
          verified_by_admin_id?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string
          dtks_registration_no?: string
          probono_id?: string
          status?: string
          verified_by_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_probono_admin"
            columns: ["verified_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users_admin"
            referencedColumns: ["admin_id"]
          },
          {
            foreignKeyName: "fk_probono_client"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "users_client"
            referencedColumns: ["client_id"]
          },
        ]
      }
      sipp_verifications: {
        Row: {
          advocate_id: string
          sipp_number: string
          status: string
          verification_id: string
          verification_notes: string | null
          verified_at: string
          verified_by_admin_id: string | null
        }
        Insert: {
          advocate_id: string
          sipp_number: string
          status?: string
          verification_id?: string
          verification_notes?: string | null
          verified_at?: string
          verified_by_admin_id?: string | null
        }
        Update: {
          advocate_id?: string
          sipp_number?: string
          status?: string
          verification_id?: string
          verification_notes?: string | null
          verified_at?: string
          verified_by_admin_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sipp_admin"
            columns: ["verified_by_admin_id"]
            isOneToOne: false
            referencedRelation: "users_admin"
            referencedColumns: ["admin_id"]
          },
          {
            foreignKeyName: "fk_sipp_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
        ]
      }
      tax_pph21_withholdings: {
        Row: {
          advocate_id: string
          created_at: string
          einvoice_ref: string
          escrow_id: string
          gross_income_idr: number
          npwp_number: string
          tax_rate_percentage: number
          tax_receipt_id: string
          tax_withheld_idr: number
        }
        Insert: {
          advocate_id: string
          created_at?: string
          einvoice_ref: string
          escrow_id: string
          gross_income_idr: number
          npwp_number: string
          tax_rate_percentage: number
          tax_receipt_id?: string
          tax_withheld_idr: number
        }
        Update: {
          advocate_id?: string
          created_at?: string
          einvoice_ref?: string
          escrow_id?: string
          gross_income_idr?: number
          npwp_number?: string
          tax_rate_percentage?: number
          tax_receipt_id?: string
          tax_withheld_idr?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_tax_advocate"
            columns: ["advocate_id"]
            isOneToOne: false
            referencedRelation: "users_advocate"
            referencedColumns: ["advocate_id"]
          },
          {
            foreignKeyName: "fk_tax_escrow"
            columns: ["escrow_id"]
            isOneToOne: false
            referencedRelation: "escrow_transactions"
            referencedColumns: ["escrow_id"]
          },
        ]
      }
      user_active_devices: {
        Row: {
          device_name: string
          device_session_id: string
          hardware_token_hash: string
          ip_address: string
          last_active_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          device_name: string
          device_session_id?: string
          hardware_token_hash: string
          ip_address: string
          last_active_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          device_name?: string
          device_session_id?: string
          hardware_token_hash?: string
          ip_address?: string
          last_active_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      user_notifications: {
        Row: {
          created_at: string
          is_read: boolean
          message_body: string
          notification_id: string
          recipient_user_id: string
          title: string
        }
        Insert: {
          created_at?: string
          is_read?: boolean
          message_body: string
          notification_id?: string
          recipient_user_id: string
          title: string
        }
        Update: {
          created_at?: string
          is_read?: boolean
          message_body?: string
          notification_id?: string
          recipient_user_id?: string
          title?: string
        }
        Relationships: []
      }
      users_admin: {
        Row: {
          admin_id: string
          created_at: string
          email: string
          fido2_enabled: boolean
          full_name: string
          role_group: string
        }
        Insert: {
          admin_id?: string
          created_at?: string
          email: string
          fido2_enabled?: boolean
          full_name: string
          role_group: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          email?: string
          fido2_enabled?: boolean
          full_name?: string
          role_group?: string
        }
        Relationships: []
      }
      users_advocate: {
        Row: {
          advocate_id: string
          advocate_organization: string
          avatar_initials: string | null
          average_rating: number | null
          bio: string | null
          created_at: string
          email: string
          experience_years: number
          full_name: string
          has_probono_quota: boolean
          is_online: boolean
          kyc_status: string
          nik_ktp: string | null
          npwp_number: string | null
          payout_bank_account_holder: string | null
          payout_bank_account_no: string | null
          payout_bank_name: string | null
          peradi_card_no: string
          phone_e164: string
          profile_slug: string | null
          review_count: number
          sipp_license_no: string
          sla_strikes: number
          specialization_primary: string
          updated_at: string
        }
        Insert: {
          advocate_id?: string
          advocate_organization?: string
          avatar_initials?: string | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          email: string
          experience_years?: number
          full_name: string
          has_probono_quota?: boolean
          is_online?: boolean
          kyc_status?: string
          nik_ktp?: string | null
          npwp_number?: string | null
          payout_bank_account_holder?: string | null
          payout_bank_account_no?: string | null
          payout_bank_name?: string | null
          peradi_card_no: string
          phone_e164: string
          profile_slug?: string | null
          review_count?: number
          sipp_license_no: string
          sla_strikes?: number
          specialization_primary: string
          updated_at?: string
        }
        Update: {
          advocate_id?: string
          advocate_organization?: string
          avatar_initials?: string | null
          average_rating?: number | null
          bio?: string | null
          created_at?: string
          email?: string
          experience_years?: number
          full_name?: string
          has_probono_quota?: boolean
          is_online?: boolean
          kyc_status?: string
          nik_ktp?: string | null
          npwp_number?: string | null
          payout_bank_account_holder?: string | null
          payout_bank_account_no?: string | null
          payout_bank_name?: string | null
          peradi_card_no?: string
          phone_e164?: string
          profile_slug?: string | null
          review_count?: number
          sipp_license_no?: string
          sla_strikes?: number
          specialization_primary?: string
          updated_at?: string
        }
        Relationships: []
      }
      users_client: {
        Row: {
          avatar_url: string | null
          client_id: string
          created_at: string
          email: string
          email_summary_enabled: boolean
          full_name: string
          kyc_status: string
          nik_ktp: string | null
          password_hash: string
          phone_e164: string
          review_anonymized_default: boolean
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          client_id?: string
          created_at?: string
          email: string
          email_summary_enabled?: boolean
          full_name: string
          kyc_status?: string
          nik_ktp?: string | null
          password_hash: string
          phone_e164: string
          review_anonymized_default?: boolean
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          client_id?: string
          created_at?: string
          email?: string
          email_summary_enabled?: boolean
          full_name?: string
          kyc_status?: string
          nik_ktp?: string | null
          password_hash?: string
          phone_e164?: string
          review_anonymized_default?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      wallet_balances: {
        Row: {
          balance_available_idr: number
          balance_held_idr: number
          updated_at: string
          user_id: string
          user_type: string
          wallet_id: string
        }
        Insert: {
          balance_available_idr?: number
          balance_held_idr?: number
          updated_at?: string
          user_id: string
          user_type: string
          wallet_id?: string
        }
        Update: {
          balance_available_idr?: number
          balance_held_idr?: number
          updated_at?: string
          user_id?: string
          user_type?: string
          wallet_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      frontend_advocate_catalog_v: {
        Row: {
          avatarInitials: string | null
          bio: string | null
          experienceYears: number | null
          hasProBonoQuota: boolean | null
          id: string | null
          isOnline: boolean | null
          license: string | null
          licenseBody: string | null
          name: string | null
          rating: number | null
          reviewCount: number | null
          services: Json | null
          slug: string | null
          specialty: string | null
        }
        Relationships: []
      }
      frontend_consultation_slots_v: {
        Row: {
          advocateId: string | null
          advocateName: string | null
          advocateRating: number | null
          advocateTitle: string | null
          id: string | null
          isBooked: boolean | null
          slotTimeLabel: string | null
          specialty: string | null
        }
        Relationships: []
      }
      frontend_escrow_transactions_v: {
        Row: {
          advocateName: string | null
          amount: number | null
          clientEmail: string | null
          createdAt: string | null
          id: string | null
          mutexLockId: string | null
          slotId: string | null
          status: string | null
          tierId: string | null
          wormAuditHash: string | null
        }
        Relationships: []
      }
      frontend_irac_analysis_v: {
        Row: {
          application: string | null
          caseTitle: string | null
          conclusion: string | null
          confidenceScore: number | null
          generatedAt: string | null
          id: string | null
          issue: string | null
          relevantArticles: Json | null
          rule: string | null
          storyOfFacts: string | null
        }
        Insert: {
          application?: string | null
          caseTitle?: never
          conclusion?: string | null
          confidenceScore?: never
          generatedAt?: string | null
          id?: never
          issue?: string | null
          relevantArticles?: Json | null
          rule?: string | null
          storyOfFacts?: never
        }
        Update: {
          application?: string | null
          caseTitle?: never
          conclusion?: string | null
          confidenceScore?: never
          generatedAt?: string | null
          id?: never
          issue?: string | null
          relevantArticles?: Json | null
          rule?: string | null
          storyOfFacts?: never
        }
        Relationships: []
      }
      frontend_legal_document_drafts_v: {
        Row: {
          advocateName: string | null
          clauses: Json | null
          clientName: string | null
          createdAt: string | null
          id: string | null
          opponentName: string | null
          templateId: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      fn_book_consultation_slot_mutex: {
        Args: {
          p_booking_type?: string
          p_client_id: string
          p_notes?: string
          p_slot_id: string
        }
        Returns: string
      }
      fn_client_checkout_consultation_mutex: {
        Args: {
          p_booking_type?: string
          p_case_summary: string
          p_slot_id: string
        }
        Returns: {
          advocate_id: string
          advocate_name: string
          amount_idr: number
          booking_code: string
          booking_id: string
          created_at: string
          escrow_id: string
          escrow_status: string
          mutex_lock_id: string
          payment_gateway_ref: string
          slot_id: string
          tier_id: string
        }[]
      }
      fn_mutate_wallet_balance_mutex: {
        Args: {
          p_amount: number
          p_mutation_type: string
          p_reference_id?: string
          p_wallet_id: string
        }
        Returns: number
      }
      fn_record_immutable_audit_log: {
        Args: {
          p_action_type: string
          p_actor_type: string
          p_actor_user_id: string
          p_metadata_json: Json
          p_target_resource: string
        }
        Returns: string
      }
      fn_refund_escrow_to_client_mutex: {
        Args: { p_escrow_id: string; p_refund_reason: string }
        Returns: boolean
      }
      fn_release_escrow_to_advocate_mutex: {
        Args: { p_escrow_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
