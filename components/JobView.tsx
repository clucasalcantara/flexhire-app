import FlexhireAPI from "@/lib/flexhire-api";
import { createClient } from "@/utils/supabase/server";
("use client");

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default async function JobsView({ jobs }: any) {
  const [userJobs, setUserJobs] = useState<any>(jobs || {});
  const { jobOpportunities } = jobs;
  const { edges, totalCount } = jobOpportunities;

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const apiKey = await localStorage.getItem("FLEXHIRE-API-KEY");
        const jobs = await FlexhireAPI.fetchLatestJobs(apiKey!);

        setUserJobs(jobs);
        toast.success("API Key Found! New jobs fetched successfully!");
      } catch (e) {
        toast.error("Error fetching jobs");
      }
    };

    fetchUserJobs();
  }, []);

  return (
    <div className="p-8 lg:p-16 flex flex-col gap-2 w-full bg-slate-700">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl text-center pb-8">
          You Job Opportunities ({totalCount})
        </h1>
        <div className="flex flex-col gap-12 mx-24">
          {edges.map(({ node }: any) => (
            <div
              key={node.id}
              className="flex flex-col gap-4 bg-slate-400 rounded p-8 hover:bg-slate-500 cursor-pointer relative shadow-lg"
            >
              <h2 className="text-2xl font-bold">{node.title}</h2>
              <span className="font-bold text-neutral-700">
                by {node.firm.name}
              </span>
              <span className="text-sm">
                {node.currency.code} {node.freelancerRate.value}/{node.rateMode}
              </span>
              <div className="flex gap-4 absolute right-2 -top-4">
                {node.positionTypes.map((positionType: any, index: number) => (
                  <div
                    key={index}
                    className="p-2 bg-green-700 rounded-xl shadow-sm"
                  >
                    <span className="uppercase text-white text-sm">
                      {positionType}
                    </span>
                  </div>
                ))}
              </div>
              <h2>Job Skills</h2>
              <div className="flex flex-wrap gap-4">
                {node.jobSkills.map((jobSkill: any, index: number) => {
                  const { skill, required, userSkill } = jobSkill;

                  return (
                    <div
                      key={index}
                      className={`p-2 ${
                        userSkill?.id ? "bg-yellow-500" : "bg-green-500"
                      } rounded-xl shadow-sm`}
                    >
                      <span className="uppercase text-white text-sm">
                        {skill.name} {required && "*"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
