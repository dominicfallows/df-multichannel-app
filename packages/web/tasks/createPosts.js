async function createPosts({ edgesQueryStr, graphql, createPage, reporter }) {

  const activity = reporter.activityTimer(`creating posts from allMdx`, {})
  activity.start();

  const { data } = await graphql(`{
    allMdx(
      sort: { fields: [frontmatter___created], order: DESC }
      filter: { fields: { type: { eq: "post" } } }
    ) {
      ${edgesQueryStr}
    }
  }`);

  if (data.errors) {
    reporter.panic(data.errors);
    throw Error(data.errors);
  }

  if (!data || !data.allMdx || !data.allMdx.edges || data.allMdx.edges.length === 0) {
    activity.end();
    return;
  }

  const nodes = data.allMdx.edges;
  const maxProcesses = 10;
  const maxNodes = nodes.length;
  const nodesPerProcess = Math.ceil(maxNodes / maxProcesses);

  let processPromises = [];

  // Create process promises
  for (var i = 0; i < maxProcesses; i++) {
    const start_i = nodesPerProcess * i;

    if (start_i >= maxNodes) {
      continue;
    }

    let end_i = start_i + (nodesPerProcess - 1);

    if (end_i > maxNodes - 1) {
      end_i = maxNodes - 1;
    }

    processPromises.push(
      new Promise(async (resolve, reject) => {
        try {
          for (let node_i = start_i; node_i <= end_i; node_i++) {
            const node = nodes[node_i]
              ? nodes[node_i].node
              : undefined;

            const path = node.frontmatter.path || node.fields.path;
            const previous = node_i === nodes.length - 1 ? null : nodes[node_i + 1].node;
            const next = node_i === 0 ? null : nodes[node_i - 1].node;

            createPage({
              path: path,
              component: node.fileAbsolutePath,
              context: {
                pagePath: path,
                node,
                next,
                previous,
              },
            });
          }
        } catch (error) {
          reject(error);
        }

        resolve(true);
      })
    );
  }

  // Run all promises
  await Promise.all(processPromises).catch(err => {
    reporter.panic(err);
    throw Error(err);
  });

  activity.end();
  return;
}

module.exports = exports = createPosts;