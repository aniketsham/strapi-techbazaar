// const sendNotificationEmail = async (blog, action) => {
//   const superAdminsUser = await strapi.db.query("admin::user").findMany({
//     where: { roles: { name: "Super Admin" } },
//     select: ["email", "firstname", "lastname"],
//   });
//   const superAdminEmails = superAdminsUser.map((admin) => admin.email);
//   try {
//     // Construct the email content
//     const emailSubject = `Blog ${action}: ${blog.Title}`;
//     const emailBody = `
//         <p>A blog has been ${action}:</p>
//         <ul>
//           <li><strong>Title:</strong> ${blog.Title}</li>
//           <li><strong>Created At:</strong> ${blog.createdAt}</li>
//         </ul>
//         <p>You can review it here: <a href="${process.env.FRONTEND_URL}/admin/content-manager/collection-types/api::blog.blog/${blog.documentId}" target="_blank">View Blog</a></p>
//       `;

//     // Send the email
//     await strapi.plugins["email"].services.email.send({
//       to: superAdminEmails,
//       subject: emailSubject,
//       from: "anikets2048@gmail.com",
//       html: emailBody,
//     });
//   } catch (error) {
//     strapi.log.error("Failed to send email notification:", error);
//   }
// };

const processTags = async (tags) => {
  if (tags.length === 0) {
    console.log("No tags to process.");
    return;
  }

  try {
    const existingTags = await strapi.db.query("api::tag.tag").findMany({
      select: ["Name"],
    });

    const existingTagNames = existingTags.map((tag) => tag.Name);

    const newTags = tags
      .map((tag) => tag.Tag)
      .filter((tag) => !existingTagNames.includes(tag));

    for (const tag of newTags) {
      await strapi.service("api::tag.tag").create({
        data: {
          Name: tag,
          slug: tag,
        },
      });
    }
  } catch (error) {
    console.error("Error creating unique tags:", error);
  }
};
export default {
  async afterCreate(event) {
    console.log("adding tags");
    const { result } = event;
    console.log(result, "Result!!!");

    const tags = result.Tags || [];
    const createdUser = result.createdBy;
    // const getUserDetail = await strapi.db.query("admin::user").findMany({
    //   where: { roles: { name: "Blog Editor" } },
    //   select: ["id", "email"],
    // });

    // console.log("Blogs editor", getUserDetail);
    // const isBlogEditor = getUserDetail.some((res) => {
    //   return res.email === createdUser.email && res.id === createdUser.id;
    // });

    await processTags(tags);

    // if (isBlogEditor) {
    //   await sendNotificationEmail(result, "created");
    // }
  },
  async afterUpdate(event) {
    console.log("adding tags");
    const { result } = event;
    const tags = result.Tags || [];
    // const updatedUser = result.updatedBy;
    // const getUserDetail = await strapi.db.query("admin::user").findMany({
    //   where: { roles: { name: "Blog Editor" } },
    //   select: ["id", "email"],
    // });

    // console.log(getUserDetail, "Get user detail!!!");
    // const isBlogEditor = getUserDetail.some((res) => {
    //   return res.email === updatedUser.email && res.id === updatedUser.id;
    // });

    await processTags(tags);
    // if (isBlogEditor) {
    //   await sendNotificationEmail(result, "updated");
    // }
  },
};
