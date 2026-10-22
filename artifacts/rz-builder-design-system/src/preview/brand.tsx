const logoSource = `${import.meta.env.BASE_URL}rz-builder-logo-source.jpg`;

export function BrandLogoPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl border bg-black">
        <img
          src={logoSource}
          alt="RZ Builder logo with the tagline Universal APK Builder"
          className="block h-auto w-full"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 text-card-foreground">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Primary lockup
          </p>
          <h2 className="mt-3 font-['Orbitron'] text-xl font-bold tracking-wide">
            RZ BUILDER
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            UNIVERSAL APK BUILDER
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 text-card-foreground">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Source
          </p>
          <p className="mt-3 text-sm leading-6">
            This supplied image is the visual reference. The lockup and tagline
            are kept as shown; no alternate tagline is substituted here.
          </p>
        </div>
      </section>
    </div>
  );
}
