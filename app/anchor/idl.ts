export type Otp = {
  "version": "0.1.0",
  "name": "otp",
  "instructions": [
    {
      "name": "generatePack",
      "accounts": [
        {
          "name": "randomData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ranges",
          "type": {
            "vec": {
              "defined": "Range"
            }
          }
        },
        {
          "name": "serverSeed",
          "type": "string"
        },
        {
          "name": "clientSeed",
          "type": "string"
        },
        {
          "name": "nonce",
          "type": "u64"
        }
      ],
      "returns": {
        "vec": "u64"
      }
    }
  ],
  "accounts": [
    {
      "name": "randomData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastGeneratedNumbers",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Range",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minRange",
            "type": "u64"
          },
          {
            "name": "maxRange",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "RandomNumbersGenerated",
      "fields": [
        {
          "name": "randomNumbers",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidRange",
      "msg": "Invalid range specified."
    }
  ]
};

export const IDL: Otp = {
  "version": "0.1.0",
  "name": "otp",
  "instructions": [
    {
      "name": "generatePack",
      "accounts": [
        {
          "name": "randomData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ranges",
          "type": {
            "vec": {
              "defined": "Range"
            }
          }
        },
        {
          "name": "serverSeed",
          "type": "string"
        },
        {
          "name": "clientSeed",
          "type": "string"
        },
        {
          "name": "nonce",
          "type": "u64"
        }
      ],
      "returns": {
        "vec": "u64"
      }
    }
  ],
  "accounts": [
    {
      "name": "randomData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastGeneratedNumbers",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Range",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "minRange",
            "type": "u64"
          },
          {
            "name": "maxRange",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "RandomNumbersGenerated",
      "fields": [
        {
          "name": "randomNumbers",
          "type": {
            "vec": "u64"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidRange",
      "msg": "Invalid range specified."
    }
  ]
};
