use anchor_lang::prelude::*;
use crate::state::Profile;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct InitializeProfile<'info> {
    #[account(
        init,
        payer = authority,
        space = Profile::SPACE,
        seeds = [b"profile", authority.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, Profile>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_profile(
    ctx: Context<InitializeProfile>,
    username: String,
    bio: String,
    metadata_uri: String,
) -> Result<()> {
    require!(username.len() <= Profile::USERNAME_MAX, ErrorCode::UsernameTooLong);
    require!(bio.len() <= Profile::BIO_MAX, ErrorCode::BioTooLong);
    require!(
        metadata_uri.len() <= Profile::METADATA_URI_MAX,
        ErrorCode::MetadataUriTooLong
    );

    let profile = &mut ctx.accounts.profile;

    profile.authority = ctx.accounts.authority.key();
    profile.username = username;
    profile.bio = bio;
    profile.metadata_uri = metadata_uri;
    profile.created_at = Clock::get()?.unix_timestamp;
    profile.bump = ctx.bumps.profile;

    Ok(())
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [b"profile", authority.key().as_ref()],
        bump = profile.bump,
        has_one = authority
    )]
    pub profile: Account<'info, Profile>,

    pub authority: Signer<'info>,
}

pub fn update_profile(
    ctx: Context<UpdateProfile>,
    username: String,
    bio: String,
    metadata_uri: String,
) -> Result<()> {
    require!(username.len() <= Profile::USERNAME_MAX, ErrorCode::UsernameTooLong);
    require!(bio.len() <= Profile::BIO_MAX, ErrorCode::BioTooLong);
    require!(
        metadata_uri.len() <= Profile::METADATA_URI_MAX,
        ErrorCode::MetadataUriTooLong
    );

    let profile = &mut ctx.accounts.profile;

    profile.username = username;
    profile.bio = bio;
    profile.metadata_uri = metadata_uri;

    Ok(())
}