import { toast } from "react-toastify";

const FlexhireAPI = {
  fetchCurrentUserProfile: async (overridalKey?: string) => {
    try {
      const response = await fetch("https://flexhire.com/api/v2", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "FLEXHIRE-API-KEY": overridalKey ?? process.env.NEXT_PUBLIC_FLEXHIRE_API_KEY!,
        },
        body: JSON.stringify({
          query: `
          {
            currentUser {
              name
              profile {
                rawId
                availableAt
                city
                region
                country {
                  code
                  id
                }
                fullAddress
                availability
                visibility
                freelancerRate {
                  value
                  currency {
                    id
                    code
                  }
                }
                clientRate {
                  value
                  currency {
                    id
                    code
                  }
                }
                freelancerType {
                  rawId
                  id
                }
                freelancerSubtypes {
                  rawId
                  id
                }
                availabilityType
                jobTypes
                textIntroduction
                totalExperience
                canWorkInTheUs
                locationLatitude
                locationLongitude
                locationBounds0
                locationBounds1
                locationBounds2
                locationBounds3
                urlBlog
                urlDribbble
                urlGithub
                urlLinkedin
                openToOpportunities
                rateMode
                managedTeamSize
                id
              }
              video {
                rawId
                id
              }
              userSkills {
                id
                experience
                skill {
                  rawId
                  name
                  id
                }
              }
              timelineEntries {
                id
                entryType
                title
                place
                dateStart
                dateEnd
                description
                institute {
                  id
                  name
                }
                skills {
                  rawId
                  name
                  id
                }
              }
              answers {
                rawId
                public
                url
                question {
                  rawId
                  title
                  id
                }
                id
              }
              resume {
                url
                id
              }
              projectSubmissions {
                description
                project {
                  title
                  id
                }
                rawId
                screenshotUrl
                status
                url
                id
              }
              avatarUrl
              status
            }
          }
        `,
        }),
      });

      const {
        data: { currentUser },
      } = await response.json();
      
      if (!currentUser) throw new Error("No user found");      
      
      return currentUser;
    } catch (error) {
      console.error(error);
    }
  },
  fetchLatestJobs: async (overridalKey?: string) => {
    const response = await fetch("https://flexhire.com/api/v2", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "FLEXHIRE-API-KEY": overridalKey ?? process.env.NEXT_PUBLIC_FLEXHIRE_API_KEY!,
      },
      body: JSON.stringify({
        query: `
        query OpportunitiesTab_Query {
          currentUser {
            ...OpportunitiesTab_List
            id
          }
        }
        
        fragment ApplicationStatusTextTag_Contract on Contract {
          status
        }
        
        fragment ApplicationStepsButton_Contract on Contract {
          status
          requestsStatus
          contractRequests {
            id
          }
        }
        
        fragment JobCard_JobFragment on Job {
          ...JobsListingItem_Job
        }
        
        fragment JobShare_Job on Job {
          slug
          firm {
            slug
            id
          }
          referralFromSelf {
            token
            id
          }
        }
        
        fragment JobsListingItem_Job on Job {
          title
          slug
          description
          positionTypes
          margin
          minMarginUsd
          rateMode
          clientRate {
            value
          }
          minClientRate {
            value
          }
          freelancerRate {
            value
          }
          minFreelancerRate {
            value
          }
          currency {
            code
            id
          }
          firm {
            slug
            name
            id
          }
          jobSkills {
            required
            requiredYears
            groupIndex
            skill {
              rawId
              name
              id
            }
            userSkill {
              experience
              id
            }
            id
          }
          contract {
            id
            status
            ...ApplicationStepsButton_Contract
            ...ApplicationStatusTextTag_Contract
            ...contract_useIsUnsentJobApplication
          }
          ...JobShare_Job
        }
        
        fragment OpportunitiesTab_List on User {
          jobOpportunities(first: 5) {
            totalCount
            edges {
              node {
                id
                ...JobCard_JobFragment
                __typename
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
          id
        }
        
        fragment contract_useIsUnsentJobApplication on Contract {
          status
        }
      `,
      }),
    })

    const {
      data: { currentUser },
    } = await response.json();

    if (!currentUser) throw new Error("No user found");      
    
    return currentUser;
  },
};

export default FlexhireAPI;
