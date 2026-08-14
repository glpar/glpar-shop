import {styled} from '..';
import Link from 'next/link';

export const HomeContainer = styled('main', {
    display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((110vw - 1180px) / 2))',
    marginLeft: 'auto',
    minHeight: 656,

    '@media (max-height: 650px)': {
        minHeight: 'calc(100svh - 4.5rem)',
    },
});

export const Product = styled(Link, {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover',
        maxWidth: '100%',
        height: 'auto',
    },

    footer: {
        position: 'absolute',
        bottom: '0.25rem',
        left: '0.25rem',
        right: '0.25rem',
        padding: '2rem',

        borderRadius: 6,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: 'rgba(0, 0, 0, 0.6)',

        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.2s ease-in-out',

        strong: {
            fontSize: '$lg',
            color: '$gray100',
        },

        span: {
            fontSize: '$xl',
            fontWeight: 'bold',
            color: '$green300',
        },
    },

    '&:hover': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
        }
    },

    '@media (max-height: 650px)': {
        footer: {
            padding: '1.25rem',
        },
    },

    '@media (hover: none)': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
            padding: '1rem',
        },
    },

    '@media (max-width: 600px)': {
        footer: {
            transform: 'translateY(0%)',
            opacity: 1,
            padding: '1rem',
        },
    },
});
