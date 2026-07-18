const PrivacyPolicyPage = () => {
  return (
    <section className="section-band">
      <div className="container max-w-4xl space-y-6">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Data & Privacy</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Privacy Policy</h1>
          <p className="text-muted-foreground">
            This page describes how Nirogi Tanman collects, uses, and protects account data, care records, and usage
            information across the platform.
          </p>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            We collect profile details, care workflow inputs, and interaction metadata required to deliver coordinated
            healthcare services.
          </p>
          <p>
            Access to health data is controlled through role-based permissions and encrypted transport.
          </p>
          <p>
            Users can request profile updates, account closure, and data export through the support team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;