"use server";

import { supabaseAdmin } from "@/utils/supabase/admin";

export async function syncWalletToProfile(walletAddress: string, userId?: string) {
  try {
    // If a user is logged in via OAuth (has a userId), we update their profile with the wallet.
    if (userId) {
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ wallet_address: walletAddress })
        .eq('id', userId);
      
      if (error) {
        console.error("Failed to link wallet to profile:", error);
        return { success: false, error: error.message };
      }
      return { success: true };
    }
    
    // If no userId, this is a pure web3 connection. In a real app we'd verify a signature.
    // For this prototype, we can check if a profile exists with this wallet.
    const { data } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();
      
    if (data) {
      return { success: true, userId: data.id };
    }

    return { success: true, message: "Wallet not linked to any profile yet." };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
