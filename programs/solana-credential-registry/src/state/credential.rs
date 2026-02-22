use anchor_lang::prelude::*;

#[account]
pub struct Credential {
    /// Issuer who issued this credential
    pub issuer: Pubkey,

    /// Subject (profile owner)
    pub subject: Pubkey,

    /// Short type identifier (e.g. "KYC", "DEV", "WINNER")
    pub credential_type: String,

    /// Metadata URI (IPFS / Arweave)
    pub metadata_uri: String,

    /// Issued timestamp
    pub issued_at: i64,

    /// PDA bump
    pub bump: u8,
}

impl Credential {
    pub const TYPE_MAX: usize = 32;
    pub const METADATA_URI_MAX: usize = 200;

    pub const SPACE: usize =
        8 +   // discriminator
        32 +  // issuer
        32 +  // subject
        4 + Self::TYPE_MAX +
        4 + Self::METADATA_URI_MAX +
        8 +   // issued_at
        1;    // bump
}