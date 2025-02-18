export type RandomNumberGenerator = {
  "name": "randomNumberGenerator",
  "version": "0.1.0",
  "address": "H6XFzHEg8yparic31ZTBFGUefQF1BouKvWYfBZVYWSHc",
  "instructions": [
    {
      "name": "generateRandomNumbers",
      "discriminator": [
        250,
        76,
        134,
        255,
        213,
        102,
        27,
        119
      ],
      "accounts": [
        {
          "name": "randomData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  65,
                  78,
                  68,
                  79,
                  77,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ranges",
          "type": {
            "vec": {
              "defined": {
                "name": "range"
              }
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
      "discriminator": [
        67,
        86,
        42,
        153,
        136,
        146,
        179,
        131
      ]
    }
  ],
  "events": [
    {
      "name": "randomNumbersGenerated",
      "discriminator": [
        194,
        17,
        124,
        217,
        136,
        53,
        17,
        174
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidRange",
      "msg": "Invalid range specified."
    }
  ],
  "types": [
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
    },
    {
      "name": "randomNumbersGenerated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "randomNumbers",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "range",
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
  ]
};

export const IDL: RandomNumberGenerator = {
  "name": "randomNumberGenerator",
  "version": "0.1.0",
  "address": "H6XFzHEg8yparic31ZTBFGUefQF1BouKvWYfBZVYWSHc",
  "instructions": [
    {
      "name": "generateRandomNumbers",
      "discriminator": [
        250,
        76,
        134,
        255,
        213,
        102,
        27,
        119
      ],
      "accounts": [
        {
          "name": "randomData",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  65,
                  78,
                  68,
                  79,
                  77,
                  95,
                  68,
                  65,
                  84,
                  65
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ranges",
          "type": {
            "vec": {
              "defined": {
                "name": "range"
              }
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
      "discriminator": [
        67,
        86,
        42,
        153,
        136,
        146,
        179,
        131
      ]
    }
  ],
  "events": [
    {
      "name": "randomNumbersGenerated",
      "discriminator": [
        194,
        17,
        124,
        217,
        136,
        53,
        17,
        174
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidRange",
      "msg": "Invalid range specified."
    }
  ],
  "types": [
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
    },
    {
      "name": "randomNumbersGenerated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "randomNumbers",
            "type": {
              "vec": "u64"
            }
          }
        ]
      }
    },
    {
      "name": "range",
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
  ]
};
