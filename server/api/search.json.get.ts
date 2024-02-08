import { serverQueryContent } from '#content/server'
import { MarkdownNode } from '@nuxt/content/dist/runtime/types';

export interface SearchResult {
    path: string,
    title: string,
    body: string[],
}

function stringify_all(nodes: MarkdownNode[]): string[] {
    let res: string[] = [];

    for (let node of nodes) {
        if (node.value) {
            res.push(node.value);
        }
    
        if (node.children) {
            res = res.concat(stringify_all(node.children));
        }
    }

    return res;
}

export default eventHandler(async (event) => {
    const sources = await serverQueryContent(event, '/').where({
        _type: 'markdown',
        doc_type: { $not: "info" },
        navigation: { $ne: false }
      }).find()

    let results: SearchResult[] = [];

    for (let source of sources) {
        if (source._path && source.title && source.body?.children) {
            results.push({
                path: source._path,
                title: source.title,
                body: stringify_all(source.body.children),
            });
        }
    }

    return results;
});
