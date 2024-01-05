import Hero from "@/components/Hero";

export default async function Index() {  
  return (
    <div className="animate-in flex flex-col opacity-0 lg:max-w-4xl px-3 w-full items-center">
      <Hero />
    </div>
  );
}
