const FlexhireAPI = {
  fetchCurrentUserProfile: async () => {

    try {
      const response = await fetch("https://flexhire.com/api/v2", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "FLEXHIRE-API-KEY": process.env.NEXT_PUBLIC_FLEXHIRE_API_KEY!,
        },
        body: JSON.stringify({
          query: `
          {
            currentUser {
              name
            }
          }
        `,
        }),
      });

      console.log({ response });

      return response.json();
    } catch (error) {
      console.error(error);
    }
  },
};

export default FlexhireAPI;
