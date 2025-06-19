"use client";
import MainLayout from "@/components/layouts/MainLayout";
import TermClient from "@/components/term/TermClient";
import Foo from "@/contents/sand/comps/Foo";
import { type TermOccuranceIndex } from "@/term-occurances.gen";
import { type TermDef } from "@/terms-index.gen";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useMemo } from "react";

export type TermPageContentProps = {
  readonly slug: string;
  readonly term: TermDef;
  readonly index: TermOccuranceIndex | null;
};

export default function TermPageContent({
  slug: _slug,
  term,
  index,
}: TermPageContentProps) {
  const definitionsListRef = useRef<HTMLDivElement>(null);
  const usagesListRef = useRef<HTMLDivElement>(null);

  const definitions = useMemo(() => index?.h2 ?? [], [index]);
  const usages = useMemo(() => index?.others ?? [], [index]);

  const definitionsVirtualizer = useVirtualizer({
    count: definitions.length,
    getScrollElement: () => definitionsListRef.current,
    estimateSize: () => 200,
    overscan: 2,
  });

  const usagesVirtualizer = useVirtualizer({
    count: usages.length,
    getScrollElement: () => usagesListRef.current,
    estimateSize: () => 200,
    overscan: 0,
  });

  return (
    <MainLayout>
      <main>
        <h1>
          <TermClient
            text={term.main.text}
            reference={term.main.text}
            term={term}
            showRuby={true}
            refIndex={0}
            termContainer={null}
          />
        </h1>
        {1 && (
          <>
            <h2>定義している箇所</h2>
            <div
              ref={definitionsListRef}
              style={{
                height: `400px`,
                overflow: "auto",
              }}
            >
              <div
                style={{
                  height: `${definitionsVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {definitionsVirtualizer.getVirtualItems().map((virtualItem) => {
                  const item = definitions[virtualItem.index];
                  return (
                    <div
                      key={virtualItem.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <Foo
                        linkPath={item.linkPath}
                        targetTermRef={item.slug}
                        targetTermRefIndex={item.refIndex}
                        height={200}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <h2>使用している箇所</h2>
            <div
              ref={usagesListRef}
              style={{
                height: `400px`,
                overflow: "auto",
              }}
            >
              <div
                style={{
                  height: `${usagesVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {usagesVirtualizer.getVirtualItems().map((virtualItem) => {
                  const item = usages[virtualItem.index];
                  return (
                    <div
                      key={virtualItem.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualItem.size}px`,
                        transform: `translateY(${virtualItem.start}px)`,
                      }}
                    >
                      <Foo
                        linkPath={item.linkPath}
                        targetTermRef={item.slug}
                        targetTermRefIndex={item.refIndex}
                        height={200}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </MainLayout>
  );
}
