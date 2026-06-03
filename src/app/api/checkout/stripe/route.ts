import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-05-27.dahlia' as any,
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'El ID de usuario es obligatorio' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Founder Pass (Early Adopter)',
              description: 'Acceso vitalicio a la DAO, airdrops y comisiones 0%.',
              images: ['https://daotalenthub.vercel.app/og.png'],
            },
            unit_amount: 1200, // $12.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/es/dashboard/profile?success=true`,
      cancel_url: `${req.nextUrl.origin}/es/early-pass?canceled=true`,
      client_reference_id: userId, // We use this to identify the user in the webhook
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Error creando Stripe checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
