use anchor_lang::prelude::*;
use sha2::{Digest, Sha256};

// Declare the program ID
declare_id!("Bku2QgshvPT3M5Zg8gSMXbSicB5uLtkTzuejTACzutWm");

#[program]
mod otp {
    use super::*;

    pub fn generate_pack(
        ctx: Context<GenerateRandom>,
        ranges: Vec<Range>,
        server_seed: String,
        client_seed: String,
        nonce: u64,
    ) -> Result<Vec<u64>> {
        let mut random_numbers = Vec::with_capacity(ranges.len());

        for (i, range) in ranges.iter().enumerate() {
            require!(range.min_range < range.max_range, ErrorCode::InvalidRange);

            let mut hasher = Sha256::new();
            hasher.update(server_seed.as_bytes());
            hasher.update(client_seed.as_bytes());
            hasher.update(&nonce.to_le_bytes());
            hasher.update(&i.to_le_bytes());
            hasher.update(&Clock::get()?.unix_timestamp.to_le_bytes());

            let result = hasher.finalize();
            let random_value = u64::from_le_bytes(result[0..8].try_into().unwrap());
            let scaled_random_value = random_value % (range.max_range - range.min_range + 1) + range.min_range;

            msg!("Random number {}: {}", i, scaled_random_value);
            random_numbers.push(scaled_random_value);
        }

        ctx.accounts.random_data.last_generated_numbers = random_numbers.clone();
        emit!(RandomNumbersGenerated { random_numbers: random_numbers.clone() });

        Ok(random_numbers)
    }
}

#[derive(Accounts)]
pub struct GenerateRandom<'info> {
    #[account(
        init_if_needed,
        seeds = [b"RANDOM_DATA"],
        bump,
        payer = user,
        space = 8 + 64 * 16,
    )]
    pub random_data: Account<'info, RandomData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct RandomData {
    pub last_generated_numbers: Vec<u64>,
}

#[event]
pub struct RandomNumbersGenerated {
    pub random_numbers: Vec<u64>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Range {
    pub min_range: u64,
    pub max_range: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid range specified.")]
    InvalidRange,
}
