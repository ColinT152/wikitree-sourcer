/*
MIT License

Copyright (c) 2020 Robert M Pavey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { simpleBuildCitationWrapper } from "../../../base/core/citation_builder.mjs";

function buildCoreCitation(ed, gd, builder) {
  builder.sourceTitle = "Newspapers.com";
  let options = builder.getOptions();

  builder.databaseHasImages = true;

  const clipString = "/clip/";
  let clipIndex = ed.url.indexOf(clipString);
  if (clipIndex != -1) {
    let remainder = ed.url.substring(clipIndex + clipString.length);
    let recordLink = "{{Newspapers.com|" + remainder.split("/")[0] + "}}";
    builder.recordLinkOrTemplate = recordLink;
  } else {
    const articleString = "/article/";
    let articleIndex = ed.url.indexOf(articleString);
    if (articleIndex != -1) {
      let remainder = ed.url.substring(articleIndex + articleString.length);
      let clipNum = remainder.replace(/^[^\/]+\/(\d+)\/$/, "$1");
      if (clipNum && clipNum != remainder) {
        let recordLink = "{{Newspapers.com|" + clipNum + "}}";
        builder.recordLinkOrTemplate = recordLink;
      }
    }
  }

  builder.sourceReference = ed.newspaperTitle;

  if (options.citation_np_includeLocation) {
    builder.sourceReference += " (" + ed.location + ")";
  }

  builder.sourceReference += " " + ed.publicationDate + ", page " + ed.pageNumber;
}

function buildCitation(input) {
  return simpleBuildCitationWrapper(input, buildCoreCitation);
}

export { buildCitation };
