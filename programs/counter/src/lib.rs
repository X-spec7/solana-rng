use anchor_lang::prelude::*;

declare_id!("H6XFzHEg8yparic31ZTBFGUefQF1BouKvWYfBZVYWSHc");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
