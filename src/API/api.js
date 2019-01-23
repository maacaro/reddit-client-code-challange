export async function APIRequest() {
  return fetch(process.env.REACT_APP_API_URL, { method: "GET" })
    .then(res => res.json())
    .then(({ data = {} }) => {
      const { children = [] } = data;
      return children.map(post => ({
        id: post.data.id || null,
        title: post.data.title || null,
        author: post.data.author || null,
        entryDate: post.data.created_utc || null,
        thumbnailURL: post.data.thumbnail || null,
        numberOfComments: post.data.num_comments || null,
        unreadStatus: post.data.visited || false
      }));
    });
}
