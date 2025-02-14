export default {
  myJob: {
    task: ({ strapi }) => {
      console.log("Task is running");
      newsList();
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};

async function newsList() {
  try {
    const response = await fetch(
      "https://content.guardianapis.com/search?api-key=80b13bdf-05aa-41f4-9735-5c8281295a57"
    );
    const data: any = await response.json();
    const results = data.response.results;

    const existingNews = await strapi
      .documents("api::news-list.news-list")
      .findMany({});

    const existingSlugs = new Set(existingNews.map((news: any) => news.slug));

    for (const result of results) {
      if (!existingSlugs.has(result.id)) {
        await strapi.documents("api::news-list.news-list").create({
          data: {
            News_title: result.webTitle,
            News_url: result.webUrl,
            News_date: result.webPublicationDate,

            slug: result.id,
          },
        });
      }
    }

    console.log("News added successfully!");
  } catch (error) {
    console.error("Error updating news:", error);
  }
}
