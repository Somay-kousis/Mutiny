"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Building2, Link2, ShieldCheck, Tag, UserRound, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

// Shared components already in this project:
import { VerificationBadge } from "@/components/verification-badge"
import { TrustInspector } from "@/components/trust-inspector"
import { AvatarUploader } from "@/components/avatar-uploader"

const INTERESTS = ["Climate hardware", "Edge AI", "Local‑first", "Robotics", "Bio tooling", "Privacy", "DePIN"]

export default function InvestorProfilePage() {
  // Essentials
  const [name, setName] = useState("Alex Rivera")
  const [firm, setFirm] = useState("Independent • Syndicate")
  const [minCheck, setMinCheck] = useState(5000)
  const [maxCheck, setMaxCheck] = useState(50000)
  const [bio, setBio] = useState(
    "Angel investor focused on climate hardware and local‑first tooling. Prefer milestone releases with transparent receipts.",
  )
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Interests
  const [interests, setInterests] = useState<string[]>(["Climate hardware", "Edge AI", "Local‑first"])

  // Preferences
  const [escrowRequired, setEscrowRequired] = useState(true)
  const [ndaPreferred, setNdaPreferred] = useState(true)
  const [pacePerQuarter, setPacePerQuarter] = useState(4)
  const [stageFocus, setStageFocus] = useState<("Pre‑seed" | "Angel" | "Seed")[]>(["Pre‑seed", "Angel", "Seed"])

  // Visibility & links
  const [publicProfile, setPublicProfile] = useState(true)
  const [handle, setHandle] = useState("alex")
  const [links] = useState([
    { label: "LinkedIn", href: "#" },
    { label: "Website", href: "#" },
  ])

  // Trust (mocked)
  const trust = 82
  const trustBreakdown = { ndas: 3, escrowReleases: 5, receipts: 12, history: 2 }

  function toggleInterest(tag: string) {
    setInterests((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }
  function toggleStage(s: "Pre‑seed" | "Angel" | "Seed") {
    setStageFocus((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const portfolio = [
    { id: "p1", name: "Edge Vision Kit" },
    { id: "p2", name: "Climate Hardware v1" },
    { id: "p3", name: "Local‑first Creator Analytics" },
  ]

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* Header: Avatar • Info • Trust */}
      <section className="rounded-xl bg-[#101113] p-5">
        <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_360px] md:items-start lg:items-center">
          {/* Avatar */}
          <div>
            <AvatarUploader name={name} src={avatarUrl} onChange={(_, url) => setAvatarUrl(url)} size={80} />
          </div>

          {/* Name + Verified + Firm */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight break-words">{name}</h1>
              {/* Never overlaps: shrink-0 and placed within its own wrapping group */}
              <VerificationBadge className="shrink-0" />
            </div>
            <p className="mt-1 flex items-center gap-2 text-white/70 text-sm">
              <Building2 className="h-4 w-4 text-white/60" />
              <span className="truncate">{firm}</span>
            </p>
          </div>

          {/* Trust + Actions (own column on lg; below on md) */}
          <div className="flex items-center gap-4 md:col-span-2 lg:col-span-1">
            <div className="flex-1 lg:flex-none">
              <TrustInspector trust={trust} baseline={75} breakdown={trustBreakdown} className="w-full max-w-[220px]" />
            </div>
            <Button className="rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Request re‑verify
            </Button>
          </div>
        </div>
      </section>

      {/* Body: Main left • Right rail */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Main column */}
        <div className="min-w-0 space-y-6">
          {/* Essentials */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>
              <Field label="Affiliation">
                <Input
                  value={firm}
                  onChange={(e) => setFirm(e.target.value)}
                  className="bg-[#0f1012] border-[#1a1b1e]"
                />
              </Field>

              <div className="grid gap-2 sm:col-span-2">
                <label className="text-xs text-white/60">Typical check size (USD)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60">Min</span>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={minCheck}
                      onChange={(e) => setMinCheck(safeInt(e.target.value, minCheck))}
                      className="h-9 bg-[#0f1012] border-[#1a1b1e]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60">Max</span>
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      value={maxCheck}
                      onChange={(e) => setMaxCheck(safeInt(e.target.value, maxCheck))}
                      className="h-9 bg-[#0f1012] border-[#1a1b1e]"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Field label="Bio">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-[100px] bg-[#0f1012] border-[#1a1b1e]"
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Button className="w-fit rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">Save (not wired)</Button>
              </div>
            </CardContent>
          </Card>

          {/* Interests */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((t) => {
                  const on = interests.includes(t)
                  return (
                    <button
                      key={t}
                      onClick={() => toggleInterest(t)}
                      className={cn(
                        "text-xs rounded-md px-3 py-1.5 border transition",
                        on ? "border-white/30 bg-white/[0.06]" : "border-[#1a1b1e] text-white/80 hover:bg-white/[0.03]",
                      )}
                      aria-pressed={on}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
              <div className="text-xs text-white/60">Used to personalize discovery and matching.</div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <RowSwitch
                label="Milestone‑based releases from escrow"
                desc="Funds are held and released on objective criteria."
                checked={escrowRequired}
                onCheckedChange={setEscrowRequired}
              />
              <RowSwitch
                label="Mutual NDA before deep details"
                desc="Default to protected sharing for sensitive docs."
                checked={ndaPreferred}
                onCheckedChange={setNdaPreferred}
              />

              <div className="grid gap-2">
                <div className="text-xs text-white/60">Stage focus</div>
                <div className="flex flex-wrap gap-2">
                  {(["Pre‑seed", "Angel", "Seed"] as const).map((s) => {
                    const on = stageFocus.includes(s)
                    return (
                      <button
                        key={s}
                        onClick={() => toggleStage(s)}
                        className={cn(
                          "text-xs rounded-md px-3 py-1.5 border transition",
                          on ? "border-white/30 bg-white/[0.06]" : "border-[#1a1b1e] hover:bg-white/[0.03]",
                        )}
                        aria-pressed={on}
                      >
                        {s}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-2">
                <div className="text-xs text-white/60">Pace (investments per quarter)</div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={12}
                    step={1}
                    value={pacePerQuarter}
                    onChange={(e) => setPacePerQuarter(Number.parseInt(e.target.value))}
                    className="w-full"
                    aria-label="Pace per quarter"
                  />
                  <div className="w-10 text-right">{pacePerQuarter}</div>
                </div>
              </div>

              <Button className="w-fit rounded-md bg-white text-[#0b0b0c] hover:bg-white/90">Save preferences</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right rail */}
        <aside className="space-y-6">
          {/* Visibility & links */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Visibility & links
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <RowSwitch
                label="Public profile"
                desc="Share a minimal, linkable profile."
                checked={publicProfile}
                onCheckedChange={setPublicProfile}
              />
              <div className="grid gap-2">
                <div className="text-xs text-white/60">Handle</div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">@</span>
                  <Input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="h-8 bg-[#0f1012] border-[#1a1b1e]"
                  />
                </div>
                <div className="text-xs text-white/60">
                  Profile URL: <span className="text-white">mutiny.to/{handle}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="text-xs text-white/60">Linked accounts</div>
                <div className="flex flex-wrap gap-2">
                  {links.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#0f1012] px-2.5 py-1.5 text-xs hover:bg-white/[0.04]"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                      {l.label}
                    </a>
                  ))}
                  <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#0f1012] px-2 py-1 text-[11px] text-white/80 hover:bg-white/[0.04]">
                    Connect…
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio snapshot */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Portfolio snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {portfolio.map((p) => (
                <Link
                  key={p.id}
                  href={`/investor/search/${p.id}`}
                  className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2 text-sm hover:bg-white/[0.04]"
                >
                  {p.name}
                </Link>
              ))}
              <div className="text-[11px] text-white/60">Tap to view each brief.</div>
            </CardContent>
          </Card>

          {/* Guidance */}
          <Card className="bg-[#101113] border-[#1a1b1e]">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Guidance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2">
                Verified investors can enable “Public profile” to receive curated intros.
              </div>
              <div className="rounded-md border border-white/10 bg-[#0f1012] px-3 py-2">
                Trust grows with NDA usage, escrow releases, and verified receipts.
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label className="text-xs text-white/60">{label}</label>
      {children}
    </div>
  )
}

function RowSwitch({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-[#1a1b1e] bg-[#0f1012] p-3">
      <div className="min-w-0">
        <div className="font-medium">{label}</div>
        {desc && <div className="text-xs text-white/60">{desc}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  )
}

function safeInt(v: string, fallback: number) {
  const n = Number.parseInt(v)
  return Number.isFinite(n) ? n : fallback
}
