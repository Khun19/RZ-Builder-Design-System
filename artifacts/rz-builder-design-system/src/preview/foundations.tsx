import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

const CORE_SWATCHES = [
  { name: 'Chrome action', className: 'bg-primary' },
  { name: 'Neutral surface', className: 'bg-secondary' },
  { name: 'Subtle surface', className: 'bg-accent' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'border bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Muted', className: 'bg-muted' },
  { name: 'Destructive', className: 'bg-destructive' },
  { name: 'Border', className: 'bg-border' },
] as const;

const TYPE_SCALE = [
  { label: 'Display · 40/48', className: 'text-4xl font-bold' },
  { label: 'Heading XL · 32/40', className: 'text-3xl font-semibold' },
  { label: 'Heading LG · 24/32', className: 'text-2xl font-semibold' },
  { label: 'Heading MD · 20/28', className: 'text-xl font-semibold' },
  { label: 'Body LG · 18/28', className: 'text-lg' },
  { label: 'Body MD · 16/24', className: 'text-base' },
  { label: 'Body SM · 14/20', className: 'text-sm' },
  { label: 'Label · 14/20', className: 'text-sm font-medium' },
  { label: 'Caption · 12/16', className: 'text-xs text-muted-foreground' },
] as const;

const SPACING_SCALE = [
  { label: '4px', token: '1' },
  { label: '8px', token: '2' },
  { label: '12px', token: '3' },
  { label: '16px', token: '4' },
  { label: '24px', token: '6' },
  { label: '32px', token: '8' },
  { label: '64px', token: '16' },
] as const;

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 rounded-lg ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-xl border border-border bg-black">
        <img
          src={`${import.meta.env.BASE_URL}rz-builder-logo-source.jpg`}
          alt="RZ Builder logo with the tagline Universal APK Builder"
          className="mx-auto block max-h-64 w-full object-contain"
        />
      </section>
      <section className="rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Core palette
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Typography
          </h2>
          <div className="mt-4 space-y-3">
            {TYPE_SCALE.map((entry) => (
              <p key={entry.label} className={entry.className}>
                {entry.label}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Scope
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            This artifact provides visual tokens and reusable UI components. It
            is not the RZ Builder application and has no live project, upload,
            build, APK, provenance, or device-acceptance data.
          </p>
        </section>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Components
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Brand colors</h2>
          <p className="text-sm text-muted-foreground">
            The core roles used for emphasis, supporting actions, and accents.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {CORE_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Status colors</h2>
          <p className="text-sm text-muted-foreground">
            Pair status color with a visible text label; do not use color alone.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {[
            { name: 'Success', token: 'success' },
            { name: 'Warning', token: 'warning' },
            { name: 'Error', token: 'error' },
            { name: 'Info', token: 'info' },
            { name: 'Neutral', token: 'neutral' },
          ].map((item) => (
            <div key={item.token} className="space-y-2">
              <div
                className="h-16 rounded-lg"
                style={{ backgroundColor: `var(--status-${item.token})` }}
              />
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Semantic and surface colors</h2>
          <p className="text-sm text-muted-foreground">
            Roles for text, backgrounds, borders, muted content, and danger.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 rounded-xl border bg-card p-6 text-card-foreground">
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Font family
        </h2>
        <p className="mt-4 text-4xl font-bold">The quick brown fox</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Inter with system and Burmese-capable fallback fonts.
        </p>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Myanmar Unicode and mixed text
        </h2>
        <div lang="my" className="space-y-3">
          <p className="text-lg leading-7">
            RZ Builder — ZIP ဖိုင်ကို စစ်ဆေးပြီး Android app တည်ဆောက်ရန်
            အထောက်အထားများကို ရှင်းလင်းစွာ ပြသပါ။
          </p>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            ဒီစာကြောင်းကို 320px မှာလည်း ဖြတ်တောက်မသွားဘဲ လိုအပ်သလို
            နောက်တစ်ကြောင်းသို့ ဆင်းနိုင်ရန် စမ်းသပ်ထားသည်။
          </p>
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-2 sm:grid-cols-[88px_1fr]">
            <span className="pt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {entry.label}
            </span>
            <p className={entry.className}>Build products people understand.</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-12 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div
                className="h-3 max-w-full rounded-full bg-primary"
                style={{ width: `var(--space-${space.token})` }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Radius values are explicit tokens, not approximations from a base.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { label: 'XS · 4px', className: 'rounded-xs' },
            { label: 'SM · 8px', className: 'rounded-sm' },
            { label: 'MD · 12px', className: 'rounded-md' },
            { label: 'LG · 16px', className: 'rounded-lg' },
            { label: 'XL · 24px', className: 'rounded-xl' },
            { label: 'Pill · 999px', className: 'rounded-pill' },
          ].map((radius) => (
            <div
              key={radius.label}
              className={`flex h-24 items-end border bg-muted p-3 ${radius.className}`}
            >
              <span className="text-xs font-medium">{radius.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
