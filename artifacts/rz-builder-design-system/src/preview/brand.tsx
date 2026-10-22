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

      <section className="rounded-xl border bg-card p-5 text-card-foreground">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Approved source
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6">
          This original image is kept unchanged. Preserve the brand name as
          “RZ Builder” and the supplied tagline “UNIVERSAL APK BUILDER”; do not
          substitute a recreated text lockup or an alternate tagline.
        </p>
      </section>
    </div>
  );
}
