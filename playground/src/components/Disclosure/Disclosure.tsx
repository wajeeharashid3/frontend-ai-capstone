"use client";

import { useId, useState } from "react";

type DisclosureProps = {
  title: string;
  children: React.ReactNode;
};

export default function Disclosure({
  title,
  children,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
      >
        {title}
      </button>

      {isOpen && (
        <div id={contentId}>
          {children}
        </div>
      )}
    </div>
  );
}