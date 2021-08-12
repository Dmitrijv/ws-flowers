const COMMENT_URL = "https://flowers-mock-data.firebaseio.com/comments/Dmitrijv";

export default class {
  async postComment(flowerId, message) {
    const res = await fetch(COMMENT_URL + `/${flowerId}.json`, {
      method: "POST",
      headers: this.getPublicHeaders(),
      body: JSON.stringify({ message }),
    });

    let json = await res.json();
    console.log({ json });

    return { message: message };
  }

  async getComments(flowerId) {
    const res = await fetch(COMMENT_URL + `/${flowerId}.json`);
    let json = await res.json();
    return json ? Object.values(json).filter((c) => c.message.length > 0) : [];
  }

  getPublicHeaders() {
    return {
      "Content-Type": "application/json",
    };
  }
}
