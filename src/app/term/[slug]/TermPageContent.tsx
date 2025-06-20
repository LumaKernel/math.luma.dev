"use client";
import TermClient from "@/components/term/TermClient";
import {
  type TermOccuranceIndex,
  type TermOccurance,
} from "@/term-occurances.gen";
import { type TermDef } from "@/terms-index.gen";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { useRef, useMemo } from "react";
import TermButton from "./TermButton";

export type VirtualTermItemProps = {
  readonly virtualItem: VirtualItem;
  readonly item: TermOccurance;
};
function VirtualTermItem({ virtualItem, item }: VirtualTermItemProps) {
  return (
    <>
      <div key={virtualItem.key}>
        <TermButton
          linkPath={item.linkPath}
          targetTermRef={item.slug}
          targetTermRefIndex={item.refIndex}
          height="100%"
        />
      </div>
      <style jsx>{`
        div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: ${virtualItem.size}px;
          transform: translateY(${virtualItem.start}px);
          padding: 0.8rem;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}

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

  const itemHeight = 260;
  const definitionsVirtualizer = useVirtualizer({
    count: definitions.length,
    getScrollElement: () => definitionsListRef.current,
    estimateSize: () => itemHeight,
    overscan: 2,
  });

  const usagesVirtualizer = useVirtualizer({
    count: usages.length,
    getScrollElement: () => usagesListRef.current,
    estimateSize: () => itemHeight,
    overscan: 0,
  });

  return (
    <>
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
        {/*
        <h2>定義している箇所</h2>
        <div ref={definitionsListRef} className="window">
          {definitionsVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = definitions[virtualItem.index];
            return (
              <VirtualTermItem
                key={virtualItem.key}
                virtualItem={virtualItem}
                item={item}
              />
            );
          })}
        </div>
        */}
        <Tabbed
          tabs={[
            {
              title: "定義している箇所",
              render: () => (
                <div ref={definitionsListRef} className="window">
                  {definitionsVirtualizer
                    .getVirtualItems()
                    .map((virtualItem) => {
                      const item = definitions[virtualItem.index];
                      return (
                        <VirtualTermItem
                          key={virtualItem.key}
                          virtualItem={virtualItem}
                          item={item}
                        />
                      );
                    })}
                </div>
              ),
            },
            {
              title: "使用している箇所",
              render: () => (
                <div ref={usagesListRef} className="window">
                  {usagesVirtualizer.getVirtualItems().map((virtualItem) => {
                    const item = usages[virtualItem.index];
                    return (
                      <VirtualTermItem
                        key={virtualItem.key}
                        virtualItem={virtualItem}
                        item={item}
                      />
                    );
                  })}
                </div>
              ),
            },
          ]}
        />
      </main>
      <style jsx>{`
        main {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .window {
          height: 100%;
          flex: 1;
          overflow-y: auto;
          position: relative;
          padding-right: 1.2rem;
        }
      `}</style>
    </>
  );
}
