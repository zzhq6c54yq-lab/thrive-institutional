# ThriveMT Business Associate Agreement (BAA) Status

> **Last Updated:** December 2024  
> **Review Schedule:** Quarterly  
> **Compliance Owner:** ThriveMT Compliance Team

---

## 📋 Vendor BAA Tracking

| Vendor | Purpose | HIPAA Eligible | BAA Status | PHI Exposure | Priority |
|--------|---------|----------------|------------|--------------|----------|
| **Supabase** | Database, Auth, Storage | ✅ Yes | 🔴 **Required** | High - All PHI | Critical |
| **Twilio** | SMS, Phone Calls | ✅ Yes | 🔴 **Required** | Medium - Contact Info | Critical |
| **Resend** | Transactional Email | ✅ Yes | 🔴 **Required** | Low - Email Only | High |
| **Together AI** | AI Processing (Henry) | ⚠️ Review Required | 🔴 **Required** | High - Conversation Data | Critical |
| **OpenAI** | Fallback AI Processing | ⚠️ Review Required | 🔴 **Required** | High - Conversation Data | Critical |
| **ElevenLabs** | Voice/Audio | ❌ No BAA Available | 🟡 **Do Not Send PHI** | None Allowed | N/A |
| **Sentry** | Error Monitoring | ⚠️ Review Required | 🟡 **Review** | Low - Error Context | Medium |

### Legend
- 🔴 **Required** - BAA must be signed before production use
- 🟡 **Review** - Needs evaluation for PHI exposure
- 🟢 **Signed** - BAA in place and valid
- ❌ **Not Available** - Vendor does not offer BAA; do not send PHI

---

## ✅ BAA Checklist

### Pre-Deployment Requirements

- [ ] **Supabase BAA** - Contact Supabase support for enterprise BAA
- [ ] **Twilio BAA** - Available on Twilio HIPAA page
- [ ] **Resend BAA** - Contact support for BAA availability
- [ ] **AI Provider BAAs** - Evaluate Together AI and OpenAI HIPAA offerings
- [ ] **Store signed BAAs** in secure, version-controlled location

### Vendor Review Process

1. **Identify PHI exposure** - What data does the vendor receive?
2. **Request BAA** - Contact vendor's compliance/legal team
3. **Review BAA terms** - Ensure it covers your use case
4. **Sign and store** - Execute BAA and store securely
5. **Annual review** - Re-evaluate BAAs annually

### BAA Storage Location

All signed BAAs should be stored in:
- **Primary:** Secure document management system (e.g., encrypted Google Drive, SharePoint)
- **Backup:** Legal team's secure repository
- **Reference:** Link in this document (update when signed)

---

## 🔄 PHI Data Flow Documentation

### Data Categories

| Category | Description | Tables Involved |
|----------|-------------|-----------------|
| **Identity PHI** | Name, email, phone, demographics | `profiles`, `therapists`, `coaches` |
| **Clinical PHI** | Mental health data, therapy notes | `therapist_client_notes`, `video_session_notes`, `ai_session_summaries` |
| **Behavioral PHI** | Mood, check-ins, assessments | `mood_entries`, `daily_check_ins`, `assessment_results` |
| **Communication PHI** | Messages, conversations | `henry_conversations`, `henry_messages`, `therapist_requests` |
| **Crisis PHI** | Crisis events, escalations | `crisis_escalations`, `crisis_escalations_v2` |
| **Activity PHI** | Therapy activities, sessions | `breathing_sessions`, `binaural_sessions`, `art_therapy_gallery` |

### Data Flow by Vendor

```
┌─────────────────┐
│   User Device   │
└────────┬────────┘
         │ TLS 1.3
         ▼
┌─────────────────┐     ┌─────────────────┐
│    Supabase     │────▶│   Twilio SMS    │ (phone only)
│  (All PHI)      │     └─────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│  Together AI    │     │    Resend       │ (email only)
│  (Conversations)│     └─────────────────┘
└─────────────────┘
```

### Data Minimization Practices

1. **AI Processing:** Only send conversation context, not full user profile
2. **Email:** Only send email address, never clinical data in email body
3. **SMS:** Only send appointment reminders, never clinical content
4. **Error Monitoring:** Scrub PHI from error logs before sending to Sentry

---

## 🔐 Encryption Standards

| State | Method | Notes |
|-------|--------|-------|
| **In Transit** | TLS 1.3 | All API calls encrypted |
| **At Rest (Supabase)** | AES-256 | Database encryption enabled |
| **At Rest (Backups)** | AES-256 | Encrypted backup storage |
| **Client-Side** | N/A | No PHI stored locally |

---

## 📅 Review Schedule

| Task | Frequency | Next Due | Owner |
|------|-----------|----------|-------|
| BAA Status Review | Quarterly | Q1 2025 | Compliance |
| Vendor Security Assessment | Annually | Dec 2025 | Security |
| Data Flow Audit | Semi-annually | Jun 2025 | Engineering |
| BAA Renewal Check | Annually | Dec 2025 | Legal |

---

## 📞 Vendor Contacts for BAA

| Vendor | BAA Contact |
|--------|-------------|
| Supabase | support@supabase.io or Enterprise Sales |
| Twilio | https://www.twilio.com/hipaa |
| Resend | support@resend.com |
| Together AI | Contact sales/compliance team |

---

## ⚠️ Important Notes

1. **Never send PHI to vendors without signed BAA**
2. **ElevenLabs does NOT offer BAA** - Do not send any PHI
3. **AI prompts should be reviewed** for PHI exposure
4. **Audit logs are enabled** for all PHI tables (see `audit_logs` table)
5. **User consent is required** before processing PHI (see onboarding flow)

---

## 📝 Changelog

| Date | Change | Author |
|------|--------|--------|
| Dec 2024 | Initial BAA documentation created | ThriveMT |
| Dec 2024 | Added PHI audit triggers to 18 tables | ThriveMT |
| Dec 2024 | Implemented consent flow in onboarding | ThriveMT |
