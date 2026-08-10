import Link from "next/link";

const navigation = [
  { href: "/", label: "Dashboard" },
  { href: "/tasks", label: "Tasks" },
  { href: "/study", label: "Study Planner" },
  { href: "/notes", label: "Notes" },
  { href: "/calendar", label: "Calendar" },
  { href: "/settings", label: "Settings" },
  { href: "/health", label: "Health Check" },
];

export default function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <Link href="/" className="brand">
        StudyFlow AI
      </Link>

      <div className="nav-links">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}