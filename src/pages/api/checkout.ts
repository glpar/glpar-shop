import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {priceId, openInNewTab} = req.body;

  if(typeof priceId !== 'string') {
    return res.status(400).json({ error: 'Price not found.' });
  }

  const siteUrl = req.headers.origin ?? process.env.NEXT_URL;

  if (!siteUrl) {
    return res.status(500).json({ error: 'Application URL is not configured.' });
  }

  const autoCloseParam = openInNewTab === true ? '&auto_close=true' : '';
  const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}${autoCloseParam}`;
  const cancelUrl = `${siteUrl}/`;

  const checkoutSession = await stripe.checkout.sessions.create ({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
