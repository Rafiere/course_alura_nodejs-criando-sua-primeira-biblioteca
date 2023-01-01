/* In this file, we will validate if the link is active or not. */

const extractLinks = (linksArray) => {
  /* We are getting an array where each array element is a file link. */
  return linksArray.map((linkObject) => {
    return Object.values(linkObject).join();
  });
};

const verifyLinkListStatus = async (linkList) => {
  /* The "Promise.all()" method receives a list of promises, which will be returned by "map()" with "fetch()" and will resolve all these promises. */

  const arrayStatus = await Promise.all(
    linkList.map(async (link) => {
      try {
        const response = await fetch(link);
        return response.status;
      } catch (error) {
        return handleErrors(error);
      }
    })
  );
  return arrayStatus;
};

const handleErrors = (error) => {
  if (error.cause.code === "ENOTFOUND") {
    return "Link not found.";
  } else {
    return "An error occurs.";
  }
};

const validateLinkList = async (linkList) => {
  const extractedLinkList = extractLinks(linkList);

  const statusList = await verifyLinkListStatus(extractedLinkList);

  return linkList.map((linkObject, index) => ({
    ...linkObject,
    status: statusList[index],
  }));
};

export default validateLinkList;
