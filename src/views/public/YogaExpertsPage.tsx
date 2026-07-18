import PractitionerCard from "@/components/app/PractitionerCard";
import { yogaExperts } from "@/data/health-data";

const YogaExpertsPage = () => {
  return (
    <section className="section-band">
      <div className="container space-y-8">
        <div className="space-y-3">
          <p className="uppercase-label text-primary">Therapeutic Movement</p>
          <h1 className="text-4xl font-semibold text-foreground md:text-5xl">Yoga Experts</h1>
          <p className="max-w-3xl text-muted-foreground">
            Personalized yoga and breathwork programs designed for flexibility, recovery, stress modulation, and sleep.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {yogaExperts.map((item) => (
            <PractitionerCard
              key={item.id}
              id={item.id}
              name={item.name}
              title={`Yoga Therapist (${item.specialty})`}
              extraLabel="Sessions Delivered"
              extraValue={item.sessions}
              rating={item.rating}
              fee="₹1,000"
              availability="Daily sessions available"
              image={item.image}
              type="yoga"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YogaExpertsPage;