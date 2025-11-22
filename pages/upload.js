import Layout from '../components/Layout';
import UploadComponent from '../components/Upload';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UploadPage() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
            router.push('/login');
        }
    }, [router]);

    return (
        <Layout title="Upload // Crypto-AI">
            <UploadComponent />
        </Layout>
    );
}
