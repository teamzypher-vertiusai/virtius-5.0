import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Fake auth delay
        setTimeout(() => {
            localStorage.setItem('auth_token', 'fake_jwt_' + Date.now());
            router.push('/upload');
        }, 1000);
    };

    return (
        <Layout title="Login // Crypto-AI">
            <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>ACCESS TERMINAL</h2>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--secondary)' }}>IDENTITY</label>
                        <input
                            type="text"
                            placeholder="ENTER USERNAME"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--text-dim)',
                                color: 'white',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--secondary)' }}>KEY</label>
                        <input
                            type="password"
                            placeholder="ENTER PASSWORD"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--text-dim)',
                                color: 'white',
                                borderRadius: '4px'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE SESSION'}
                    </button>
                </form>
            </div>
        </Layout>
    );
}
