"use client";
import Link from "next/link";
import { cssColors } from "@/lib/colors";
import { useRef, useState, useEffect } from "react";

export default function Foo() {
  const linkPath = "/statistics/elementary";
  const targetTermRef = "correlation-coefficient";
  const targetTermRefIndex = 0;
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });
  const [lens, setLens] = useState({ x: 0, y: 0, scale: 0, active: false });
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
        const ease = 0.18; // 追従速度
        const targetX = mouse.x;
        const targetY = mouse.y;
        const nextX = prev.x + (targetX - prev.x) * ease;
        const nextY = prev.y + (targetY - prev.y) * ease;
        const nextScale = mouse.active ? Math.min(prev.scale + 0.12, 1) : Math.max(prev.scale - 0.12, 0);
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

  // グラデーション中心を動的に
  const lensStyle = {
    opacity: lens.scale,
    left: lens.x - 60,
    top: lens.y - 60,
    transform: `scale(${0.8 + 0.25 * lens.scale})`,
    filter: `blur(${4 - 3 * lens.scale}px) saturate(1.2)`,
    background: `radial-gradient(circle at ${60 + (lens.x - mouse.x) * 0.2}px ${60 + (lens.y - mouse.y) * 0.2}px, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.05) 100%)`,
    transition: 'opacity 0.35s cubic-bezier(.4,0,.2,1), filter 0.35s, transform 0.35s',
  } as React.CSSProperties;

  return (
    <>
      <span className="lens-btn-wrap">
        <Link href={`${linkPath}#term.${targetTermRef}.${targetTermRefIndex}`} legacyBehavior>
          <a
            ref={btnRef}
            className="lens-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="lens-effect"
              style={lensStyle}
            />
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
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          transition: box-shadow 0.2s;
          cursor: pointer;
          background: #fff;
        }
        .lens-btn:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .lens-effect {
          pointer-events: none;
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          z-index: 2;
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
