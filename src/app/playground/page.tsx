"use client";

import { useRef, useState } from "react";
import Disclosure from "../../../playground/src/components/Disclosure/Disclosure";
import Modal from "../../../playground/src/components/Modal/Modal";
import Tabs from "../../../playground/src/components/Tabs/Tabs";

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    requestAnimationFrame(() => {
      openButtonRef.current?.focus();
    });
  };

  return (
    <main>
      <h1>Accessibility Playground</h1>

      <section>
        <h2>Disclosure</h2>

        <Disclosure title="Show details">
          <p>
            This content can be expanded and collapsed using the disclosure
            button.
          </p>
        </Disclosure>
      </section>

      <section>
        <h2>Modal</h2>

        <button
          ref={openButtonRef}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Open modal
        </button>

        <Modal
          isOpen={isModalOpen}
          title="StudyFlow information"
          onClose={handleCloseModal}
        >
          <p>This is an accessible modal dialog.</p>
        </Modal>
      </section>

      <section>
        <h2>Tabs</h2>

        <Tabs
          tabs={[
            {
              label: "Study",
              content: <p>Plan and manage your study sessions.</p>,
            },
            {
              label: "Tasks",
              content: <p>View and manage your study tasks.</p>,
            },
            {
              label: "Notes",
              content: <p>Review your study notes.</p>,
            },
          ]}
        />
      </section>
    </main>
  );
}