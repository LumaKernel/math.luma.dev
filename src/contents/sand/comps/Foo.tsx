"use client";
import Link from "next/link";
import { cssColors } from "@/lib/colors";
import { useRef, useState, useEffect } from "react";

export type FooProps = {
  readonly linkPath: string;
  readonly targetTermRef: string;
  readonly targetTermRefIndex: number;
};
export default function Foo({
  linkPath,
  targetTermRef,
  targetTermRefIndex,
}: FooProps) {
  // const linkPath = "/statistics/elementary";
  // const targetTermRef = "correlation-coefficient";
  // const targetTermRefIndex = 0;
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [lens, setLens] = useState({ x: 0, y: 0, scale: 0, active: false });
  const [pulse, setPulse] = useState(0);
  const [blink, setBlink] = useState(0);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // マウス座標を記録
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };
  const handleMouseLeave = () => setMouse((l) => ({ ...l, active: false }));

  // レンズ座標をジンワリ追従させる
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setLens((prev) => {
        const ease = 0.18;
        const targetX = mouse.x;
        const targetY = mouse.y;
        const nextX = prev.x + (targetX - prev.x) * ease;
        const nextY = prev.y + (targetY - prev.y) * ease;
        const nextScale = mouse.active
          ? Math.min(prev.scale + 0.12, 1)
          : Math.max(prev.scale - 1.12, 0);
        return {
          x: nextX,
          y: nextY,
          scale: nextScale,
          active: mouse.active,
        };
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [mouse.x, mouse.y, mouse.active]);

  // 鼓動・明滅アニメーション
  useEffect(() => {
    let rafId: number;
    let blinkTimeout: NodeJS.Timeout | null = null;
    let lastBlink = 0;
    const animate = () => {
      const now = performance.now();
      // 鼓動: 2.8秒周期のsin波
      const pulseVal = Math.sin((now / 2800) * Math.PI * 2) * 0.08;
      setPulse(pulseVal);
      // 明滅: たまに強く光る
      if (now - lastBlink > 3500 + Math.random() * 250000) {
        setBlink(1);
        lastBlink = now;
        if (blinkTimeout) clearTimeout(blinkTimeout);
        blinkTimeout = setTimeout(() => setBlink(0), 220 + Math.random() * 180);
      }
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(rafId);
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, []);

  const pulseStrength = mouse.active ? 1.0 : 0.4;
  const blinkStrength = mouse.active ? 0.7 : 0.2;
  const scale =
    0.8 + 0.25 * lens.scale + pulse * pulseStrength + blink * blinkStrength;
  const opacity =
    lens.scale * (0.85 + 0.15 * blink) + Math.abs(pulse) * 0.12 * pulseStrength;
  const blur =
    4 -
    3 * lens.scale -
    1.2 * Math.abs(pulse) * pulseStrength -
    blink * 0.7 * blinkStrength;
  const size = 25;
  const gradX = size + (lens.x - mouse.x) * 0.2 + Math.sin(pulse * 6) * 4;
  const gradY = size + (lens.y - mouse.y) * 0.2 + Math.cos(pulse * 6) * 4;
  const lensStyle = {
    opacity,
    left: lens.x - size,
    top: lens.y - size,
    transform: `scale(${scale})`,
    filter: `blur(${blur}px) saturate(1.2)`,
    background: `radial-gradient(circle at ${gradX}px ${gradY}px, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.05) 100%)`,
    transition:
      "opacity 0.5s cubic-bezier(.4,0,.2,1), filter 0.5s, transform 0.5s",
  } satisfies React.CSSProperties;

  return (
    <>
      <span className="lens-btn-wrap">
        <Link
          href={`${linkPath}#term.${targetTermRef}.${targetTermRefIndex}`}
          legacyBehavior
        >
          <a
            ref={btnRef}
            className="lens-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span className="lens-effect" style={lensStyle} />
            <span className="lens-distort" style={lensStyle} />
            <iframe
              src={`${linkPath}?termRefView=true&termRefView.ref=${targetTermRef}&termRefView.index=${targetTermRefIndex}#term.${targetTermRef}.${targetTermRefIndex}`}
              width="100%"
            />
          </a>
        </Link>
      </span>
      <style jsx>{`
        .lens-btn-wrap {
          display: block;
        }
        .lens-btn {
          display: block;
          position: relative;
          border-radius: 0.8em;
          overflow: hidden;
          border-style: solid;
          border-width: 3px;
          border-color: ${cssColors.border};
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          transition: box-shadow 0.2s;
          cursor: pointer;
          background: #fff;
        }
        .lens-btn:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        }
        .lens-effect {
          pointer-events: none;
          position: absolute;
          width: ${size * 2}px;
          height: ${size * 2}px;
          border-radius: 50%;
          z-index: 2;
        }
        .lens-distort {
          pointer-events: none;
          position: absolute;
          width: ${size * 2}px;
          height: ${size * 2}px;
          border-radius: 50%;
          z-index: 1;
          background: transparent;
          backdrop-filter: blur(0.2px) contrast(1.11) saturate(1.04);
          opacity: 0.55;
          transition:
            opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            filter 0.5s,
            transform 0.5s;
        }
        iframe {
          display: block;
          border: none;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
