const TermsConditionsPage = () => {
  return (
    <section className="section-band">
      <div className="container max-w-4xl space-y-6">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Legal</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            These terms govern your use of Nirogi Tanman services, consultation workflows, subscriptions, and platform
            interactions.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Platform guidance and AI-generated suggestions are educational and do not replace licensed clinician
            diagnosis.
          </p>
          <p>
            Appointment and subscription usage is subject to practitioner availability and plan entitlements.
          </p>
          <p>
            Users are responsible for accurate profile and health information while using the platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsPage;