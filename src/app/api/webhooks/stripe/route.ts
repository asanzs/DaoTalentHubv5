import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/utils/supabase/admin';

// Initialize Stripe with the secret key placeholder
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-05-27.dahlia' as any, // Update with the correct API version if needed
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature found' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Verification logic: Check if it's the specific $12 USD charge for Pase Fundador
      // session.amount_total is in cents
      if (session.amount_total === 1200 && session.currency === 'usd') {
        console.log('Pago de 12 USD completado exitosamente para el Pase Fundador.');
        
        const userId = session.client_reference_id || session.metadata?.userId;
        if (userId) {
          console.log(`Proveyendo Pase Fundador al usuario: ${userId}`);
          // Actualizar en la base de datos que este usuario tiene el Pase Fundador
          const { error } = await supabaseAdmin
            .from('profiles')
            .update({ has_founder_pass: true })
            .eq('id', userId);
            
          if (error) {
            console.error('Error actualizando perfil en Supabase:', error);
          } else {
            console.log('Perfil actualizado exitosamente con Pase Fundador.');
          }
        } else {
          console.log('Pago recibido pero no se encontró un userId asociado en la sesión.');
        }
      }
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      // Payment intents also use amounts in cents
      if (paymentIntent.amount === 1200 && paymentIntent.currency === 'usd') {
        console.log('Pago de 12 USD completado vía payment_intent.succeeded.');
        console.log('Payment Intent Details:', paymentIntent);
        
        // TODO: Logica de provisión usando metadata
        const userId = paymentIntent.metadata?.userId;
        if (userId) {
          console.log(`Proveyendo Pase Fundador al usuario: ${userId}`);
        }
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
