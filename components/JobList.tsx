import FlexhireAPI from "@/lib/flexhire-api";

export default async function JobList() {
    const jobs = await FlexhireAPI.fetchLatestJobs();
    const { jobOpportunities } = jobs;
    const { edges } = jobOpportunities;
    
    return (
        <div className="flex flex-col gap-4">
            <h1>Latest Jobs</h1>
            <div className="flex gap-4">
            {edges.map(({ node }: any) => (
                <div className="flex flex-col gap-4 bg-slate-400 rounded p-8 hover:bg-slate-600 cursor:pointer">
                    <h2>{node.title}</h2>
                </div>
            ))}
            </div>
        </div>
    )
}