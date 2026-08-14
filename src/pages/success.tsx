import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  costumerName: string;
  autoClose: boolean;
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ costumerName, autoClose, product }: SuccessProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  useEffect(() => {
    if (!autoClose) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    const closeTimeoutId = window.setTimeout(() => {
      window.close();
    }, 15000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(closeTimeoutId);
    };
  }, [autoClose]);

  return (
    <>
      <Head>
        <title>Compra efetuada | GLPAR Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        {autoClose && (
          <div className="autoCloseNotice">
            <p>Você já pode fechar esta página.</p>
            <span>
              Esta página vai fechar automaticamente em {secondsRemaining} {secondsRemaining === 1 ? 'segundo' : 'segundos'}.
            </span>
          </div>
        )}

        <Link href="/">
          Voltar ao catálogo
        </Link>

      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const costumerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      costumerName,
      autoClose: query.auto_close === 'true',
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}
