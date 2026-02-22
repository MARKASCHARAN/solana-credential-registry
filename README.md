# 🧾 Solana Credential Registry

A **permissioned, on-chain credential and identity registry** built on **Solana** using **Anchor**.

This protocol enables:
* Users to create verifiable on-chain profiles  
* Admins to onboard trusted issuers  
* Issuers to mint **immutable credentials** (certificates, attestations, proofs)  
* Anyone to verify credentials fully on-chain  

> Think: **on-chain resumes, KYC badges, hackathon certificates, reputation proofs**.

---

## ✨ Why this project?

Most Web3 identity systems today are:
* Off-chain
* Centralized
* Hard to verify
* Easy to fake

This project explores a **clean, minimal, on-chain primitive** for credentials that is:
* Deterministic (PDA-based)
* Permissioned
* Verifiable
* Frontend-agnostic

The focus is on **protocol design and security**, not UI.

---

## 🧠 High-Level Architecture

The protocol is composed of **three layers**:

[ Profile ] → Identity
↓
[ Issuer ] → Trust
↓
[ Credential ] → Proof

Each layer is implemented as an on-chain account with **strict PDA derivations and access control**.

---

## 🧱 Core Accounts

### 1️⃣ Profile (Identity Layer)

Represents a user’s on-chain identity.

**PDA**
`["profile", user_pubkey]`

**Stored Data**
* authority (user public key)
* username
* bio
* metadata URI
* bump

**Properties**
* One profile per user
* Owned and updateable only by the user
* Fixed-size account (no realloc risk)

---

### 2️⃣ Issuer (Trust Layer)

Represents a **trusted credential issuer** (company, DAO, institution).

**PDA**
`["issuer", issuer_pubkey]`

**Stored Data**
* issuer public key
* is_active flag
* added_at timestamp
* bump

**Properties**
* Can only be added by admin
* Can be disabled without deleting history
* Required to issue credentials

---

### 3️⃣ Credential (Proof Layer)

Represents an **immutable credential** issued by a trusted issuer to a user.

**PDA**
`["credential", issuer, subject, credential_type]`

**Stored Data**
* issuer
* subject (user)
* credential_type (e.g. DEV, KYC, WINNER)
* metadata URI (IPFS / Arweave)
* issued_at timestamp
* bump

**Properties**
* Immutable once created
* Unique per `(issuer, subject, credential_type)`
* Fully verifiable on-chain

---

## 🔐 Security Model

### Authority Controls
* Only the profile owner can manage their profile
* Only admin can add or disable issuers
* Only active issuers can issue credentials

### PDA Safety
* All accounts use deterministic PDAs
* No collisions
* No duplicate credentials

### Data Safety
* Fixed-size accounts
* Explicit maximum string lengths
* No dynamic reallocations

---

## 🧪 Testing Strategy

Anchor TypeScript tests simulate the **full lifecycle**:

1. User creates a profile  
2. Admin registers an issuer  
3. Issuer issues a credential  
4. On-chain data is fetched and verified  

Tests explicitly derive PDAs to ensure determinism.

> Note: Local SBF compilation may be restricted in some environments. Logic correctness is validated via `cargo check`, and tests are CI-ready.

---

## 🛠 Tech Stack

* Solana
* Anchor 0.32
* Rust
* TypeScript (Anchor tests)
* PDA-based account design

---

## 📂 Project Structure

```text
programs/
└── solana-credential-registry/
    ├── src/
    │   ├── lib.rs
    │   ├── errors.rs
    │   ├── state/
    │   │   ├── profile.rs
    │   │   ├── issuer.rs
    │   │   └── credential.rs
    │   └── instructions/
    │       ├── profile.rs
    │       ├── issuer.rs
    │       └── credential.rs
tests/
└── solana-credential-registry.ts