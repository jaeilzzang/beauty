const createRouter = (prefix: string) => (path: string) => {
  const replaceHyphen = path.replace(/_/g, "-").toLowerCase();

  if (prefix) {
    return `/${prefix}/${replaceHyphen}`;
  }

  return `/${replaceHyphen}`;
};

const createAuthRouter = createRouter("auth");
const createNormalRouter = createRouter("");

export const ROUTE = {
  HOME: createNormalRouter("HOME"),
  LOGIN: createAuthRouter("LOGIN"),
  SIGN_UP: createAuthRouter("SIGN_UP"),
  EMAIL_VERIFICATION: createAuthRouter("EMAIL_VERIFICATION"),
  MY_PAGE: createAuthRouter("MY_PAGE"),
  FORGET_PASSWORD: createAuthRouter("FORGET_PASSWORD"),
  LOCATION: createNormalRouter("LOCATION"),
  LOCATION_DETAIL: createNormalRouter("LOCATION"),
  HOSPITAL: createNormalRouter("HOSPITAL"),
  HOSPITAL_DETAIL: createNormalRouter("HOSPITAL"),
  EVENT: createNormalRouter("EVENT"),
  EVENT_DETAIL: createNormalRouter("EVENT"),
  RECOMMEND: createNormalRouter("RECOMMEND"),
  RECOMMEND_DETAIL: createNormalRouter("RECOMMEND"),
  FAVORITE: createNormalRouter("FAVORITE"),
};
