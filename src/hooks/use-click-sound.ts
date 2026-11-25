'use client';

import { useCallback, useRef } from 'react';

interface UseClickSoundOptions {
    src?: string;
    volume?: number;
}

interface UseClickSoundReturn {
    play: () => void;
    isSupported: boolean;
}

/**
 * Web Audio API based UI click sound.
 * Loads an audio asset (default /assets/sound/mouseclick.wav) and decodes it
 * once, then plays it on every click with minimal latency. Falls back to a
 * synthesized click if the asset fails to load. Fails silently if audio is
 * blocked or unsupported.
 */
export const useClickSound = (
    options: UseClickSoundOptions = {},
): UseClickSoundReturn => {
    const { src = '/assets/sound/mouseclick.wav', volume = 0.75 } = options;

    const audioCtxRef = useRef<AudioContext | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);
    const loadingRef = useRef<Promise<AudioBuffer | null> | null>(null);

    const getOrCreateContext = useCallback((): AudioContext | null => {
        if (typeof window === 'undefined') return null;
        if (!audioCtxRef.current) {
            const Ctx =
                window.AudioContext ||
                (
                    window as unknown as {
                        webkitAudioContext?: typeof AudioContext;
                    }
                ).webkitAudioContext;
            if (!Ctx) return null;
            audioCtxRef.current = new Ctx();
        }
        return audioCtxRef.current;
    }, []);

    const loadBuffer = useCallback(async (): Promise<AudioBuffer | null> => {
        if (bufferRef.current) return bufferRef.current;
        if (loadingRef.current) return loadingRef.current;

        loadingRef.current = (async () => {
            try {
                const ctx = getOrCreateContext();
                if (!ctx) return null;

                const res = await fetch(src);
                if (!res.ok) return null;
                const arrayBuffer = await res.arrayBuffer();
                const buffer = await ctx.decodeAudioData(arrayBuffer);
                bufferRef.current = buffer;
                return buffer;
            } catch {
                return null;
            }
        })();

        return loadingRef.current;
    }, [getOrCreateContext, src]);

    const playSynth = useCallback((): AudioBuffer | null => {
        const ctx = getOrCreateContext();
        if (!ctx) return null;

        const sampleRate = ctx.sampleRate;
        const duration = 0.08;
        const length = sampleRate * duration;
        const buffer = ctx.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < length; i++) {
            const t = i / sampleRate;
            const env = Math.exp(-t * 40);
            const tone = Math.sin(2 * Math.PI * 800 * t) * env;
            const noise = (Math.random() * 2 - 1) * Math.exp(-t * 120) * 0.3;
            data[i] = (tone + noise) * 0.5;
        }

        return buffer;
    }, [getOrCreateContext]);

    const play = useCallback(async () => {
        if (typeof window === 'undefined') return;

        try {
            const ctx = getOrCreateContext();
            if (!ctx) return;
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            let buffer = await loadBuffer();
            if (!buffer) buffer = playSynth();
            if (!buffer) return;

            const source = ctx.createBufferSource();
            source.buffer = buffer;

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(volume, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + 0.08,
            );

            source.connect(gain);
            gain.connect(ctx.destination);
            source.start(0);
        } catch {
            // Audio is optional — fail silently
        }
    }, [getOrCreateContext, loadBuffer, playSynth, volume]);

    const isSupported =
        typeof window !== 'undefined' &&
        !!(
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
                .webkitAudioContext
        );

    return { play, isSupported };
};
