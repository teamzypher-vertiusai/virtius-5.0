import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Result() {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [hash, setHash] = useState('');

    useEffect(() => {
        const img = localStorage.getItem('processed_image');
        const h = localStorage.getItem('image_hash');
        if (!img) {
            router.push('/upload');
        } else {
            setImage(img);
            setHash(h);
        }
    }, []);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `crypto-ai-${hash.substring(0, 8)}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout title="Result // Crypto-AI">
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className="title-gradient" style={{ marginBottom: '1rem' }}>PROCESSING COMPLETE</h2>

                <div style={{
                    marginBottom: '2rem',
                    border: '1px solid var(--primary)',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.5)'
                }}>
                    {image && (
                        <img
                            src={image}
                            alt="Processed"
                            style={{ maxWidth: '100%', maxHeight: '500px', display: 'block', margin: '0 auto' }}
                        />
                    )}
                </div>

                <div style={{ marginBottom: '2rem', textAlign: 'left', background: '#000', padding: '1rem', borderRadius: '8px' }}>
                    <p className="mono" style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>CRYPTOGRAPHIC SIGNATURE:</p>
                    <p className="mono" style={{ color: 'var(--primary)', wordBreak: 'break-all' }}>{hash}</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => router.push('/upload')} className="btn-secondary">
                        PROCESS NEW IMAGE
                    </button>
                    <button onClick={handleDownload} className="btn-primary">
                        DOWNLOAD ASSET
                    </button>
                </div>
            </div>
        </Layout>
    );
}
