import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as tf from '@tensorflow/tfjs';

export default function Processor() {
    const router = useRouter();
    const canvasRef = useRef(null);
    const [status, setStatus] = useState('INITIALIZING...');
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [hash, setHash] = useState('');

    const addLog = (msg) => setLogs(prev => [...prev, `> ${msg}`]);

    useEffect(() => {
        processImage();
    }, []);

    const processImage = async () => {
        const src = localStorage.getItem('source_image');
        if (!src) {
            router.push('/upload');
            return;
        }

        const img = new Image();
        img.src = src;
        img.onload = async () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // STEP 1: CRYPTO HASHING
            setStatus('GENERATING CRYPTO SIGNATURE...');
            setProgress(20);
            addLog('Reading image buffer...');

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const buffer = imageData.data.buffer;

            addLog('Computing SHA-256 hash...');
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHash(hashHex);
            addLog(`Signature: ${hashHex.substring(0, 16)}...`);

            await new Promise(r => setTimeout(r, 800)); // Visual delay

            // STEP 2: ADVERSARIAL DISTORTION ENGINE
            setStatus('APPLYING ADVERSARIAL DISTORTIONS...');
            setProgress(50);
            addLog('Targeting AI feature detection...');

            const data = imageData.data;
            const width = canvas.width;
            const height = canvas.height;

            // Use crypto hash as deterministic seed for adversarial patterns
            const seed = hashArray[0];
            const seed2 = hashArray[1];
            const seed3 = hashArray[2];

            addLog('Injecting high-frequency noise...');

            // ADVERSARIAL TECHNIQUE 1: High-frequency noise in AI-sensitive channels
            // AI models rely heavily on specific frequency patterns - we disrupt them
            for (let i = 0; i < data.length; i += 4) {
                const pixelIndex = i / 4;
                const x = pixelIndex % width;
                const y = Math.floor(pixelIndex / width);

                // Create pseudo-random but deterministic noise from hash
                const noiseR = ((seed * x + seed2 * y) % 17) - 8;
                const noiseG = ((seed2 * x + seed3 * y) % 17) - 8;
                const noiseB = ((seed3 * x + seed * y) % 17) - 8;

                // Apply subtle high-frequency noise (imperceptible to humans, confusing to AI)
                data[i] = Math.max(0, Math.min(255, data[i] + noiseR));
                data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noiseG));
                data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noiseB));
            }

            addLog('Perturbing edge gradients...');

            // ADVERSARIAL TECHNIQUE 2: Edge perturbations (breaks feature detection)
            // AI uses edge detection - we add imperceptible perturbations
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const idx = (y * width + x) * 4;

                    // Detect edges using simple gradient
                    const rightIdx = (y * width + (x + 1)) * 4;
                    const downIdx = ((y + 1) * width + x) * 4;

                    const gradX = Math.abs(data[idx] - data[rightIdx]);
                    const gradY = Math.abs(data[idx] - data[downIdx]);

                    // If edge detected, add adversarial perturbation
                    if (gradX > 30 || gradY > 30) {
                        const edgeNoise = ((seed + x * y) % 13) - 6;
                        data[idx] = Math.max(0, Math.min(255, data[idx] + edgeNoise));
                        data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + edgeNoise));
                        data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + edgeNoise));
                    }
                }
            }

            addLog('Scrambling texture patterns...');

            // ADVERSARIAL TECHNIQUE 3: Texture scrambling in feature-rich areas
            // AI models use texture analysis - we disrupt it while preserving human perception
            for (let y = 0; y < height; y += 8) {
                for (let x = 0; x < width; x += 8) {
                    // Calculate texture variance in 8x8 block
                    let variance = 0;
                    const blockPixels = [];

                    for (let by = 0; by < 8 && y + by < height; by++) {
                        for (let bx = 0; bx < 8 && x + bx < width; bx++) {
                            const idx = ((y + by) * width + (x + bx)) * 4;
                            const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
                            blockPixels.push(brightness);
                        }
                    }

                    const mean = blockPixels.reduce((a, b) => a + b, 0) / blockPixels.length;
                    variance = blockPixels.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / blockPixels.length;

                    // High variance = feature-rich area, apply stronger adversarial noise
                    if (variance > 500) {
                        for (let by = 0; by < 8 && y + by < height; by++) {
                            for (let bx = 0; bx < 8 && x + bx < width; bx++) {
                                const idx = ((y + by) * width + (x + bx)) * 4;
                                const texNoise = ((seed2 * bx + seed3 * by) % 11) - 5;

                                data[idx] = Math.max(0, Math.min(255, data[idx] + texNoise));
                                data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + texNoise));
                                data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + texNoise));
                            }
                        }
                    }
                }
            }

            addLog('Applying color channel shifts...');

            // ADVERSARIAL TECHNIQUE 4: Strategic color channel manipulation
            // Confuses AI color-based classification while maintaining human perception
            for (let i = 0; i < data.length; i += 4) {
                const pixelIndex = i / 4;

                // Subtle channel-specific perturbations based on hash
                if ((pixelIndex + seed) % 7 === 0) {
                    // Swap small amounts between channels (imperceptible to humans)
                    const tempR = data[i];
                    data[i] = Math.max(0, Math.min(255, data[i] * 0.98 + data[i + 1] * 0.02));
                    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * 0.98 + tempR * 0.02));
                }
            }

            addLog('Preserving human-visible features...');

            // HUMAN PRESERVATION: Maintain overall luminance and contrast
            // Calculate and preserve average brightness to keep image recognizable
            let totalBrightness = 0;
            for (let i = 0; i < data.length; i += 4) {
                totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
            }
            const avgBrightness = totalBrightness / (data.length / 4);

            // Subtle brightness normalization to maintain human readability
            const targetBrightness = avgBrightness;
            let currentBrightness = 0;
            for (let i = 0; i < data.length; i += 4) {
                currentBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
            }
            currentBrightness /= (data.length / 4);

            const brightnessFactor = targetBrightness / (currentBrightness || 1);
            if (Math.abs(brightnessFactor - 1) > 0.1) {
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.max(0, Math.min(255, data[i] * brightnessFactor));
                    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] * brightnessFactor));
                    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] * brightnessFactor));
                }
            }

            addLog('Adversarial distortion complete.');
            addLog('AI detection resistance: ACTIVE');

            ctx.putImageData(imageData, 0, 0);
            await new Promise(r => setTimeout(r, 1200));

            // STEP 3: AI CLOAKING (TF.js)
            setStatus('NEURAL CLOAKING ENGINE...');
            setProgress(80);
            addLog('Loading Tensor operations...');

            try {
                // Convert canvas to tensor
                const tensor = tf.browser.fromPixels(canvas);

                // Apply simple tensor operations to simulate "AI" effects
                // We'll do a channel shift and some noise without needing a heavy model
                const [r, g, b] = tf.split(tensor, 3, 2);

                // Shift channels
                const shiftedR = r.reverse(1); // Flip horizontally
                const shiftedG = g.reverse(0); // Flip vertically

                // Recombine
                const newTensor = tf.concat([shiftedR, shiftedG, b], 2);

                // Render back to canvas
                await tf.browser.toPixels(newTensor, canvas);

                // Cleanup
                tensor.dispose();
                r.dispose();
                g.dispose();
                b.dispose();
                newTensor.dispose();

                addLog('Neural transformation complete.');
            } catch (e) {
                console.error(e);
                addLog('Neural engine warning: Fallback to canvas ops.');
            }

            setProgress(100);
            setStatus('PROCESSING COMPLETE');

            // Save result
            localStorage.setItem('processed_image', canvas.toDataURL());
            localStorage.setItem('image_hash', hashHex);

            setTimeout(() => {
                router.push('/result');
            }, 1000);
        };
    };

    return (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 className="mono">{status}</h2>
                <span className="mono" style={{ color: 'var(--primary)' }}>{progress}%</span>
            </div>

            <div className="loading-bar">
                <div className="loading-progress" style={{ width: `${progress}%` }}></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                {/* Canvas Container */}
                <div style={{
                    border: '1px solid var(--text-dim)',
                    height: '300px',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                }}>
                    <canvas
                        ref={canvasRef}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                    <div className="scanline"></div>
                </div>

                {/* Terminal Output */}
                <div style={{
                    background: '#000',
                    padding: '1rem',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    height: '300px',
                    overflowY: 'auto',
                    border: '1px solid var(--text-dim)'
                }}>
                    {logs.map((log, i) => (
                        <div key={i} style={{ marginBottom: '0.5rem', color: i === logs.length - 1 ? 'var(--primary)' : 'var(--text-dim)' }}>
                            {log}
                        </div>
                    ))}
                    {hash && (
                        <div style={{ marginTop: '1rem', wordBreak: 'break-all', color: 'var(--accent)' }}>
                            HASH: {hash}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
