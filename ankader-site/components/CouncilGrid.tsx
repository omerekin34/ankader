import BoardAvatar from "@/components/BoardAvatar";
import BoardContact from "@/components/BoardContact";
import type { SiteBoardMember } from "@/lib/site-types";

function isChair(role: string) {
  return role.toLocaleLowerCase("tr-TR").includes("başkan");
}

export default function CouncilGrid({ people }: { people: SiteBoardMember[] }) {
  if (!people.length) {
    return <p className="mt-8 text-sm text-accent">Bu kurul henüz eklenmedi.</p>;
  }

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person, index) => {
        const chair = isChair(person.role);
        return (
          <article
            key={`${person.name}-${person.role}-${index}`}
            data-reveal
            className={`group/card reveal rounded-[1.6rem] border bg-white p-6 shadow-[0_18px_50px_-32px_rgba(15,44,65,0.55)] transition duration-300 hover:-translate-y-1 hover:border-primary/50 sm:p-7 ${
              chair ? "border-primary/40" : "border-secondary/10"
            }`}
          >
            <BoardAvatar
              name={person.name}
              initials={person.initials}
              image={person.photo}
              className={`size-20 text-lg font-bold ${chair ? "bg-primary text-secondary" : "bg-secondary text-white"}`}
            />
            <h3 className="mt-5 text-lg font-sans font-semibold text-secondary">{person.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{person.role}</p>
            <BoardContact email={person.email} phone={person.phone} />
          </article>
        );
      })}
    </div>
  );
}
