use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("3DgWa2j5szKnJmVQngNUce2r47kFgevAPyWz2yjegNpq");
pub const ADMIN_PUBKEY: &str = "6CQ5w84P6PYpYzmgKy44v1wBPM8QVnYVj3p3mQLcGhTe";

#[program]
pub mod solana_credential_registry {
    use super::*;

    pub fn initialize_profile(
        ctx: Context<InitializeProfile>,
        username: String,
        bio: String,
        metadata_uri: String,
    ) -> Result<()> {
        instructions::profile::initialize_profile(ctx, username, bio, metadata_uri)
    }

    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        username: String,
        bio: String,
        metadata_uri: String,
    ) -> Result<()> {
        instructions::profile::update_profile(ctx, username, bio, metadata_uri)
    }

    pub fn add_issuer(ctx: Context<AddIssuer>) -> Result<()> {
    instructions::issuer::add_issuer(ctx)
    }

    pub fn toggle_issuer(
    ctx: Context<ToggleIssuer>,
    is_active: bool,
    ) -> Result<()> {
    instructions::issuer::toggle_issuer(ctx, is_active)
    }

    pub fn issue_credential(
    ctx: Context<IssueCredential>,
    credential_type: String,
    metadata_uri: String,
    ) -> Result<()> {
    instructions::credential::issue_credential(
        ctx,
        credential_type,
        metadata_uri,
    )
    }

    
}