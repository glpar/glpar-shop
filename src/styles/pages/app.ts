import { styled } from "..";

export const Container = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: "100vh",
})

export const Header = styled('header', {
    padding: "2rem 0",
    width: "100%",
    maxWidth: 1180,
    margin: "0 auto",

    strong: {
        color: '$green500',
        fontSize: '1.5rem',
        letterSpacing: '0.08rem',
    },

    '@media (max-height: 650px)': {
        padding: '1rem 1.5rem',
    },

    '@media (max-width: 600px)': {
        padding: '1.25rem',
    },
})
