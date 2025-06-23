import chalk from "chalk";
import config from "config";

const xsrfToken = config.get("xsrf-token");

export class Webflow {
  constructor(cookies, projectName) {
    this.cookies = cookies;
    this.pages = new WebflowPages(cookies, projectName);
    this.dom = new WebflowDom(cookies, projectName);
  }
}

class WebflowDom {
  constructor(cookies, projectName) {
    this.cookies = cookies;
    this.projectName = projectName;
  }

  async push(pageId, domRequest) {
    const url = `https://${this.projectName}.design.webflow.com/api/pages/${pageId}/dom`;

    const headers = {
      cookie: this.cookies,
      accept: "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json; charset=UTF-8",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "x-xsrf-token": xsrfToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(domRequest),
    });

    return response;
  }

  async get() {
    const url = `https://${this.projectName}.design.webflow.com/api/sites/${this.projectName}/dom?t=1735230202188`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        cookie: this.cookies,
      },
    });

    console.log(await response.text());

    return await response.json();
  }
}

class WebflowPages {
  constructor(cookies, projectName) {
    this.cookies = cookies;
    this.projectName = projectName;
  }

  async get({ pageId }) {
    const url = `https://${this.projectName}.design.webflow.com/api/sites/${this.projectName}/dom?pageId=${pageId}&t=1735223352205`;

    const cookie = this.cookies;

    const headers = {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "ru,en-US;q=0.9,en;q=0.8,ru-RU;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie,
    };

    const response = await fetch(url, {
      headers,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    });

    return response;
  }
}
