import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <meta httpEquiv="refresh" content="0; url=/login" />
            </Head>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#050505',
                color: '#00ff88',
                fontFamily: 'monospace'
            }}>
                <p>Redirecting to login...</p>
            </div>
        </>
    );
}
