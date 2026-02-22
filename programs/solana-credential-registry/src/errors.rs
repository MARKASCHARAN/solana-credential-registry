use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Username exceeds maximum length")]
    UsernameTooLong,

    #[msg("Bio exceeds maximum length")]
    BioTooLong,

    #[msg("Metadata URI exceeds maximum length")]
    MetadataUriTooLong,

    #[msg("Unauthorized action")]
    Unauthorized,

    #[msg("Issuer is inactive")]
    IssuerInactive,

    #[msg("Credential type exceeds maximum length")]
    CredentialTypeTooLong,
}