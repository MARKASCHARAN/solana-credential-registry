use anchor_lang::prelude::*;
use crate::state::{Issuer, Credential};
use crate::errors::ErrorCode;

#[derive(Accounts)]
#[instruction(credential_type: String)]
pub struct IssueCredential<'info> {
    #[account(
        init,
        payer = issuer,
        space = Credential::SPACE,
        seeds = [
            b"credential",
            issuer.key().as_ref(),
            subject.key().as_ref(),
            credential_type.as_bytes()
        ],
        bump
    )]
    pub credential: Account<'info, Credential>,

    /// Issuer must be registered and active
    #[account(
        seeds = [b"issuer", issuer.key().as_ref()],
        bump = issuer_account.bump,
        constraint = issuer_account.is_active @ ErrorCode::IssuerInactive
    )]
    pub issuer_account: Account<'info, Issuer>,

    #[account(mut)]
    pub issuer: Signer<'info>,

    /// Profile owner receiving the credential
    pub subject: SystemAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn issue_credential(
    ctx: Context<IssueCredential>,
    credential_type: String,
    metadata_uri: String,
) -> Result<()> {
    require!(
        credential_type.len() <= Credential::TYPE_MAX,
        ErrorCode::CredentialTypeTooLong
    );

    require!(
        metadata_uri.len() <= Credential::METADATA_URI_MAX,
        ErrorCode::MetadataUriTooLong
    );

    let credential = &mut ctx.accounts.credential;

    credential.issuer = ctx.accounts.issuer.key();
    credential.subject = ctx.accounts.subject.key();
    credential.credential_type = credential_type;
    credential.metadata_uri = metadata_uri;
    credential.issued_at = Clock::get()?.unix_timestamp;
    credential.bump = ctx.bumps.credential;

    Ok(())
}