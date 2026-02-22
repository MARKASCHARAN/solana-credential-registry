use anchor_lang::prelude::*;

#[account]
pub struct Issuer {
    /// Wallet allowed to issue credentials
    pub issuer: Pubkey,

    /// Whether this issuer is currently active
    pub is_active: bool,

    /// When issuer was added
    pub added_at: i64,

    /// PDA bump
    pub bump: u8,
}

impl Issuer {
    pub const SPACE: usize =
        8 +  // discriminator
        32 + // issuer pubkey
        1 +  // is_active
        8 +  // added_at
        1;   // bump
}