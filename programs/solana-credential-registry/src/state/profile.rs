use anchor_lang::prelude::*;

#[account]
pub struct Profile {
    /// Wallet that owns this profile
    pub authority: Pubkey,

    /// Display name (max 32 chars)
    pub username: String,

    /// Short bio (max 160 chars)
    pub bio: String,

    /// IPFS / Arweave metadata URI (max 200 chars)
    pub metadata_uri: String,

    /// Unix timestamp when profile was created
    pub created_at: i64,

    /// PDA bump
    pub bump: u8,
}

impl Profile {
    pub const USERNAME_MAX: usize = 32;
    pub const BIO_MAX: usize = 160;
    pub const METADATA_URI_MAX: usize = 200;

    /// Exact account size (fixed — no realloc)
    pub const SPACE: usize =
        8 +  // discriminator
        32 + // authority
        4 + Self::USERNAME_MAX +
        4 + Self::BIO_MAX +
        4 + Self::METADATA_URI_MAX +
        8 +  // created_at
        1;   // bump
}