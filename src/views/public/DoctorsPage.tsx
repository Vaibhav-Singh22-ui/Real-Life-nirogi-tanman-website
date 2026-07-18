import PractitionerCard from "@/components/app/PractitionerCard";
import { doctors } from "@/data/health-data";

const DoctorsPage = () => {
  return (
    <section className="section-band">
      <div className="container space-y-8">
        <div>
          <p className="uppercase-label text-primary">Medical Team</p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">Doctors</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Book from curated specialists in integrative and preventive healthcare.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <PractitionerCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              title={doctor.specialty}
              extraLabel="Experience"
              extraValue={doctor.experience}
              rating={doctor.rating}
              fee={doctor.fee}
              availability={doctor.availability}
              image={doctor.image}
              type="doctor"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsPage;
