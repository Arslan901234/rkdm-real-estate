import Link from "next/link";
import { ExternalLink, FolderKanban, Inbox, LogOut, Settings } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { LogoMark } from "@/components/logo";

const LINKS = [
  { href: "/admin", label: "Projects", icon: FolderKanban },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  return (
    <div className="border-b border-white/10 bg-forest-950 pt-24 pb-8 text-sand-100">
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark className="h-9 w-9" />
          <div>
            <p className="font-display text-lg font-medium text-white">RKDM Admin</p>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-gold-400">
              Content Management
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] font-bold text-sand-100/80 transition hover:border-gold-400/60 hover:text-gold-300"
            >
              <l.icon className="h-3.5 w-3.5" />
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] font-bold text-sand-100/80 transition hover:border-gold-400/60 hover:text-gold-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Site
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-[12px] font-bold text-forest-950 transition hover:bg-gold-400"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
