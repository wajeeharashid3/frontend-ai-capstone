# Accessibility Playground Notes

## What I built

I built three interactive accessibility components from scratch using React and TypeScript:

- Disclosure
- Modal dialog
- Tabs

I tested the components using keyboard-only interaction.

## Comparison with shadcn/ui

After installing shadcn/ui, I read the generated Dialog and Tabs source code.

### 1. Dialog behavior

My Modal manually implements important behavior such as Escape handling, focus management, and the focus trap.

The shadcn Dialog is built on `@base-ui/react/dialog`. Instead of implementing all dialog behavior manually, the component delegates the interaction behavior to the Base UI Dialog primitive.

This means my implementation required more manual accessibility logic.

### 2. Dialog structure and accessibility

My Modal has a basic dialog structure with a title, content, and close button.

The shadcn implementation provides separate components such as:

- `DialogTitle`
- `DialogDescription`
- `DialogHeader`
- `DialogFooter`
- `DialogClose`
- `DialogOverlay`
- `DialogPortal`

This gives developers more reusable pieces for creating a complete dialog while keeping the accessibility structure consistent.

### 3. Tabs keyboard behavior

My Tabs manually manages the active tab index and implements keyboard navigation for:

- ArrowRight
- ArrowLeft
- Home
- End

The shadcn Tabs implementation delegates the tab interaction behavior to `@base-ui/react/tabs`.

This reduces the amount of keyboard and state-management logic that has to be written manually.

### 4. Tabs component structure

My implementation has one `Tabs` component that receives an array of tabs.

The shadcn implementation separates the Tabs pattern into reusable components:

- `Tabs`
- `TabsList`
- `TabsTrigger`
- `TabsContent`

This makes the component API more flexible and allows the individual parts of the tab pattern to be composed separately.

## Main lesson

Building the components myself helped me understand the accessibility requirements before using a component library.

The shadcn implementation is not simply about styling. It provides reusable component structure and delegates complex interaction behavior to accessibility-focused primitives.

The main difference is that my components make the accessibility logic visible and manual, while shadcn provides reusable primitives that handle much of the interaction behavior for me.type NOTES.md