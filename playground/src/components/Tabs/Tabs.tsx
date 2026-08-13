"use client";

import { useId, useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex = activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);

    const nextTab = document.getElementById(`${id}-tab-${nextIndex}`);
    nextTab?.focus();
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div>
      <div role="tablist" aria-label="StudyFlow sections">
        {tabs.map((tab, index) => {
          const tabId = `${id}-tab-${index}`;
          const panelId = `${id}-panel-${index}`;

          return (
            <button
              key={tabId}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={panelId}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleKeyDown}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        const tabId = `${id}-tab-${index}`;
        const panelId = `${id}-panel-${index}`;

        if (activeIndex !== index) {
          return null;
        }

        return (
          <div
            key={panelId}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}