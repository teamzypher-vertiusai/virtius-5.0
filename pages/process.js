import Layout from '../components/Layout';
import Processor from '../components/Processor';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProcessPage() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            router.push('/login');
        }
    }, []);

    return (
        <Layout title="Processing // Crypto-AI">
            <Processor />
        </Layout>
    );
}
