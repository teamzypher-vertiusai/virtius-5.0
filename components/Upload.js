import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function Upload() {
    const router = useRouter();
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            // Save to storage for processing
            try {
                localStorage.setItem('source_image', e.target.result);
            } catch (err) {
                alert('Image too large for local storage demo. Please use a smaller image.');
                setPreview(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const startProcessing = () => {
        router.push('/process');
    };

    return (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>UPLOAD TARGET</h2>

            {!preview ? (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current.click()}
                    style={{
                        border: `2px dashed ${dragActive ? 'var(--primary)' : 'var(--text-dim)'}`,
                        borderRadius: '12px',
                        padding: '4rem 2rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        background: dragActive ? 'rgba(0, 255, 136, 0.05)' : 'transparent'
                    }}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <p className="mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                        DRAG & DROP OR CLICK
                    </p>
                    <p style={{ color: 'var(--text-dim)' }}>Supports JPG, PNG, WEBP</p>
                </div>
            ) : (
                <div>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        marginBottom: '2rem',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid var(--primary)'
                    }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <div className="scanline"></div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button onClick={() => setPreview(null)} className="btn-secondary">
                            RESET
                        </button>
                        <button onClick={startProcessing} className="btn-primary">
                            INITIATE PROCESS
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
