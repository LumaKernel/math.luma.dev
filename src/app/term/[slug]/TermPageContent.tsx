"use client";
import TermClient from "@/components/term/TermClient";
import {
  type TermOccuranceIndex,
  type TermOccurance,
} from "@/term-occurances.gen";
import { type TermDef } from "@/terms-index.gen";
import type { Virtualizer } from "@tanstack/react-virtual";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { useRef, useMemo } from "react";
import TermButton from "./TermButton";
import { parseAsStringEnum, useQueryState } from "nuqs";

type TabItem<TabTitle extends string> = {
  readonly title: TabTitle;
  readonly render: () => React.ReactNode;
};

type TabbedProps<TabTitle extends string> = {
  readonly tabs: readonly TabItem<TabTitle>[];
  readonly activeTab?: TabTitle;
  readonly onTabChange: (title: TabTitle) => void;
};

function Tabbed<TabTitle extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabbedProps<TabTitle>) {
  if (tabs.length === 0) return null;

  const activeTabTitle = activeTab ?? tabs[0]?.title;
  const activeTabItem =
    tabs.find((tab) => tab.title === activeTabTitle) ?? tabs[0];

  return (
    <>
      <div className="tabbed-container">
        <div className="tab-headers">
          {tabs.map((tab) => (
            <button
              key={tab.title}
              className={`tab-header ${tab.title === activeTabTitle ? "active" : ""}`}
              onClick={() => onTabChange(tab.title)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="tab-content">{activeTabItem.render()}</div>
      </div>
      <style jsx>{`
        .tabbed-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
          overflow: hidden;
        }
        .tab-headers {
          display: flex;
          border-bottom: 2px solid var(--colors-border);
          margin-bottom: 1rem;
        }
        .tab-header {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          color: var(--colors-text);
          position: relative;
          transition: opacity 0.2s;
        }
        .tab-header:hover {
          opacity: 0.8;
        }
        .tab-header.active {
          font-weight: bold;
        }
        .tab-header.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--colors-text);
        }
        .tab-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}

type TabWindowProps = {
  readonly listRef: React.RefObject<HTMLDivElement | null>;
  readonly virtualizer: Virtualizer<HTMLDivElement, Element>;
  readonly items: readonly TermOccurance[];
};

function TabWindow({ listRef, virtualizer, items }: TabWindowProps) {
  return (
    <>
      <div ref={listRef} className="window">
        <div>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <VirtualTermItem
                key={virtualItem.key}
                virtualItem={virtualItem}
                item={item}
              />
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .window {
          height: 100%;
          overflow-y: auto;
          position: relative;
          padding-right: 1.2rem;
        }
      `}</style>
    </>
  );
}

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
  readonly term: TermDef;
  readonly index: TermOccuranceIndex | null;
};
export default function TermPageContent({ term, index }: TermPageContentProps) {
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

  const tabs = [
    {
      title: "定義している箇所",
      render: () => (
        <TabWindow
          listRef={definitionsListRef}
          virtualizer={definitionsVirtualizer}
          items={definitions}
        />
      ),
    },
    {
      title: "使用している箇所",
      render: () => (
        <TabWindow
          listRef={usagesListRef}
          virtualizer={usagesVirtualizer}
          items={usages}
        />
      ),
    },
  ] as const;

  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsStringEnum(tabs.map((tab) => tab.title)).withDefault(tabs[0].title),
  );

  const handleTabChange = (title: (typeof tabs)[number]["title"]) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setActiveTab(title);
  };

  return (
    <>
      <div className="wrapper">
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
        <Tabbed
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
        />
      </div>
      <style jsx>{`
        .wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .tabs-container {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
