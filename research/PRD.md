# Product Requirements Document (PRD): Leak Radar Web Platform

## 1. Executive Summary

- **Problem Statement**: Users are experiencing "wealth erosion" due to forgotten subscriptions, hidden bank fees, and "free trials" that convert to paid plans without notification. Existing mobile-first tools often lack the depth for a comprehensive financial "audit."
- **Proposed Solution**: A web-based "Financial Command Center" that automatically identifies leaks through data visualization and a browser extension ("Trial Guard") that prevents new leaks at the point of purchase.
- **Success Criteria**:
    - Users can identify at least 3 "leaks" within 60 seconds of first dashboard load.
    - Trial Guard extension successfully detects and "guards" 90% of common subscription checkout pages.
    - 70% of users who use the "Kill Switch" bulk-cancellation report feeling "more in control."
    - Zero data breaches of financial metadata.

## 2. User Experience & Functionality

### User Personas
- **The Modern Saver**: Tech-savvy, uses multiple digital services, wants to optimize their savings rate without manual spreadsheet work.

### User Stories
- **Story**: As a Modern Saver, I want to see all my recurring charges in a single, sortable data grid so that I can prioritize what to cancel.
- **Story**: As a Modern Saver, I want a browser extension to alert me when I'm signing up for a free trial so that I don't forget to cancel it.
- **Story**: As a Modern Saver, I want to "bulk-select" unwanted subscriptions and initiate a cancellation process in one click.

### Acceptance Criteria
- **Dashboard**: Must feature a "Radar" visualization showing spending frequency and amount.
- **Data Grid**: Must support sorting by "Last Used Date" and "Monthly Cost."
- **Trial Guard**: Must detect common keywords (e.g., "7-day trial", "subscribe", "billing cycle") on active tabs.
- **Security**: All financial data must be encrypted at rest and in transit.

### Non-Goals
- Real-time stock or crypto portfolio tracking (focus is strictly on "leaks" and recurring costs).
- Automated banking (e.g., moving money between accounts).
- Full accounting software (e.g., tax preparation).

## 3. AI System Requirements

- **Tool Requirements**: 
    - LLM-based categorization for transaction descriptions (e.g., "AMZN MKTP" -> "Amazon Prime Subscription").
    - Pattern recognition for "ghost" fees (recurring ATM or maintenance fees).
- **Evaluation Strategy**: 
    - Manual review of 100 sample transactions to ensure >95% categorization accuracy.
    - False positive rate for "leaks" must be <5%.

## 4. Technical Specifications

- **Architecture Overview**: 
    - **Frontend**: React (TypeScript) SPA for the Dashboard.
    - **Extension**: Manifest V3 Browser Extension (React-based popup).
    - **Backend**: Node.js/Express API (for data aggregation and AI processing).
    - **Database**: PostgreSQL for user preferences and anonymized transaction metadata.
- **Integration Points**: 
    - Plaid or similar API for financial data aggregation (simulated for MVP).
    - Browser `tabs` and `webNavigation` APIs for the Trial Guard extension.
- **Security & Privacy**: 
    - OAuth 2.0 for user authentication.
    - GDPR/CCPA compliant data handling.

## 5. Risks & Roadmap

- **Phased Rollout**:
    - **v1.0 (MVP)**: Manual transaction import, Radar Visualization, Basic Trial Guard alerts.
    - **v1.1**: Plaid integration for live data, AI-driven "Kill Switch" automation.
    - **v2.0**: "Negotiate for me" bot (AI that emails services to lower rates).
- **Technical Risks**:
    - **Extension Fragility**: Websites changing their DOM structure, breaking the Trial Guard detection logic.
    - **Data Latency**: Large transaction histories causing slow dashboard loads.
    - **User Trust**: Difficulty in convincing users to link sensitive bank data.
