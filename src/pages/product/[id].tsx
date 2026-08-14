import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
  }

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl
    }
    catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false);
      alert ('Falha ao direcionar ao Checkout!')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | GLPAR Shop</title>
      </Head>
      
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
        </ImageContainer>

        <ProductDetails>
          <h1> {product.name} </h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          
          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
            Comprar Agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}


export const getStaticProps: GetStaticProps<ProductProps, {id:string}> = async ({params}) => {
  const productId = params?.id;

  if (!productId) {
    return { notFound: true }
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price | null
  const imageUrl = product.images[0]

  if (!price?.unit_amount || !imageUrl) {
    return { notFound: true }
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: price.currency,
        }).format(price.unit_amount / 100),
        description: product.description ?? '',
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
