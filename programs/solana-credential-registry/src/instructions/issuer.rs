use anchor_lang::prelude::*;
use crate::state::Issuer;
use crate::errors::ErrorCode;

#[derive(Accounts)]
pub struct AddIssuer<'info> {
    #[account(
        init,
        payer = admin,
        space = Issuer::SPACE,
        seeds = [b"issuer", issuer.key().as_ref()],
        bump
    )]
    pub issuer_account: Account<'info, Issuer>,

    /// Wallet being registered as issuer
    pub issuer: SystemAccount<'info>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn add_issuer(ctx: Context<AddIssuer>) -> Result<()> {
    // Admin check
    require!(
        ctx.accounts.admin.key().to_string() == crate::ADMIN_PUBKEY,
        ErrorCode::Unauthorized
    );

    let issuer_account = &mut ctx.accounts.issuer_account;

    issuer_account.issuer = ctx.accounts.issuer.key();
    issuer_account.is_active = true;
    issuer_account.added_at = Clock::get()?.unix_timestamp;
    issuer_account.bump = ctx.bumps.issuer_account;

    Ok(())
}

#[derive(Accounts)]
pub struct ToggleIssuer<'info> {
    #[account(
        mut,
        seeds = [b"issuer", issuer_account.issuer.as_ref()],
        bump = issuer_account.bump
    )]
    pub issuer_account: Account<'info, Issuer>,

    #[account(mut)]
    pub admin: Signer<'info>,
}

pub fn toggle_issuer(
    ctx: Context<ToggleIssuer>,
    is_active: bool,
) -> Result<()> {
    require!(
        ctx.accounts.admin.key().to_string() == crate::ADMIN_PUBKEY,
        ErrorCode::Unauthorized
    );

    ctx.accounts.issuer_account.is_active = is_active;

    Ok(())
}