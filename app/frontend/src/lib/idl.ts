export const IDL = {
  "address": "3DgWa2j5szKnJmVQngNUce2r47kFgevAPyWz2yjegNpq",
  "metadata": {
    "name": "solana_credential_registry",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "add_issuer",
      "discriminator": [
        252,
        97,
        3,
        221,
        65,
        162,
        177,
        32
      ],
      "accounts": [
        {
          "name": "issuer_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  115,
                  115,
                  117,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "issuer",
          "docs": [
            "Wallet being registered as issuer"
          ]
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initialize_profile",
      "discriminator": [
        32,
        145,
        77,
        213,
        58,
        39,
        251,
        234
      ],
      "accounts": [
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        },
        {
          "name": "metadata_uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "issue_credential",
      "discriminator": [
        255,
        193,
        171,
        224,
        68,
        171,
        194,
        87
      ],
      "accounts": [
        {
          "name": "credential",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  100,
                  101,
                  110,
                  116,
                  105,
                  97,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              },
              {
                "kind": "account",
                "path": "subject"
              },
              {
                "kind": "arg",
                "path": "credential_type"
              }
            ]
          }
        },
        {
          "name": "issuer_account",
          "docs": [
            "Issuer must be registered and active"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  115,
                  115,
                  117,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "issuer"
              }
            ]
          }
        },
        {
          "name": "issuer",
          "writable": true,
          "signer": true
        },
        {
          "name": "subject",
          "docs": [
            "Profile owner receiving the credential"
          ]
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "credential_type",
          "type": "string"
        },
        {
          "name": "metadata_uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "toggle_issuer",
      "discriminator": [
        169,
        86,
        98,
        14,
        4,
        56,
        90,
        194
      ],
      "accounts": [
        {
          "name": "issuer_account",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  105,
                  115,
                  115,
                  117,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "issuer_account.issuer",
                "account": "Issuer"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        }
      ],
      "args": [
        {
          "name": "is_active",
          "type": "bool"
        }
      ]
    },
    {
      "name": "update_profile",
      "discriminator": [
        98,
        67,
        99,
        206,
        86,
        115,
        175,
        1
      ],
      "accounts": [
        {
          "name": "profile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "authority"
              }
            ]
          }
        },
        {
          "name": "authority",
          "signer": true,
          "relations": [
            "profile"
          ]
        }
      ],
      "args": [
        {
          "name": "username",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        },
        {
          "name": "metadata_uri",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Credential",
      "discriminator": [
        145,
        44,
        68,
        220,
        67,
        46,
        100,
        135
      ]
    },
    {
      "name": "Issuer",
      "discriminator": [
        216,
        19,
        83,
        230,
        108,
        53,
        80,
        14
      ]
    },
    {
      "name": "Profile",
      "discriminator": [
        184,
        101,
        165,
        188,
        95,
        63,
        127,
        188
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UsernameTooLong",
      "msg": "Username exceeds maximum length"
    },
    {
      "code": 6001,
      "name": "BioTooLong",
      "msg": "Bio exceeds maximum length"
    },
    {
      "code": 6002,
      "name": "MetadataUriTooLong",
      "msg": "Metadata URI exceeds maximum length"
    },
    {
      "code": 6003,
      "name": "Unauthorized",
      "msg": "Unauthorized action"
    },
    {
      "code": 6004,
      "name": "IssuerInactive",
      "msg": "Issuer is inactive"
    },
    {
      "code": 6005,
      "name": "CredentialTypeTooLong",
      "msg": "Credential type exceeds maximum length"
    }
  ],
  "types": [
    {
      "name": "Credential",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "issuer",
            "docs": [
              "Issuer who issued this credential"
            ],
            "type": "pubkey"
          },
          {
            "name": "subject",
            "docs": [
              "Subject (profile owner)"
            ],
            "type": "pubkey"
          },
          {
            "name": "credential_type",
            "docs": [
              "Short type identifier (e.g. \"KYC\", \"DEV\", \"WINNER\")"
            ],
            "type": "string"
          },
          {
            "name": "metadata_uri",
            "docs": [
              "Metadata URI (IPFS / Arweave)"
            ],
            "type": "string"
          },
          {
            "name": "issued_at",
            "docs": [
              "Issued timestamp"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Issuer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "issuer",
            "docs": [
              "Wallet allowed to issue credentials"
            ],
            "type": "pubkey"
          },
          {
            "name": "is_active",
            "docs": [
              "Whether this issuer is currently active"
            ],
            "type": "bool"
          },
          {
            "name": "added_at",
            "docs": [
              "When issuer was added"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "Profile",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Wallet that owns this profile"
            ],
            "type": "pubkey"
          },
          {
            "name": "username",
            "docs": [
              "Display name (max 32 chars)"
            ],
            "type": "string"
          },
          {
            "name": "bio",
            "docs": [
              "Short bio (max 160 chars)"
            ],
            "type": "string"
          },
          {
            "name": "metadata_uri",
            "docs": [
              "IPFS / Arweave metadata URI (max 200 chars)"
            ],
            "type": "string"
          },
          {
            "name": "created_at",
            "docs": [
              "Unix timestamp when profile was created"
            ],
            "type": "i64"
          },
          {
            "name": "bump",
            "docs": [
              "PDA bump"
            ],
            "type": "u8"
          }
        ]
      }
    }
  ]
} as const;
