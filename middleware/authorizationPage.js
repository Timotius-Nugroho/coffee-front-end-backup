import cookies from "next-cookies";

export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (allCookies.token) {
      return context.res.writeHead(302, { Location: "/product-cust" }).end();
    }
    return resolve("unauthorized");
  });
}

export function authPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (!allCookies.token) {
      return context.res.writeHead(302, { Location: "/login" }).end();
    }

    return resolve({
      token: allCookies.token,
      userId: allCookies.userId,
    });
  });
}
