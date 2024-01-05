import Hero from "@/components/Hero";
import JobList from "@/components/JobList";

export default async function Index() {  
  return (
    <div className="animate-in flex flex-col opacity-0 max-w-4xl px-3 w-full items-center">
      <Hero />
      <JobList />
    </div>
  );
}
