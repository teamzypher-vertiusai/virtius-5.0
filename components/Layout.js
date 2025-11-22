import Head from 'next/head';

export default function Layout({ children, title = 'Crypto-AI Processor' }) {
    return (
        <div className="container">
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <header style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="title-gradient" style={{ fontSize: '1.5rem' }}>ANTIGRAVITY // AI</h1>
                <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                    SECURE_MODE: ACTIVE
                </div>
            </header>

            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {children}
            </main>

            <footer style={{ padding: '2rem 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                <p className="mono">NO DATABASE // CLIENT SIDE ONLY // ENCRYPTED</p>
            </footer>
        </div>
    );
}
