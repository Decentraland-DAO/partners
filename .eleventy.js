const markdownIt = require("markdown-it");
const markdownItRenderer = new markdownIt({
    html: false,
    breaks: true, 
});

module.exports = {
    templateFormats: ["html", "md"]
};

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("fonts");
    eleventyConfig.addPassthroughCopy("js");
    eleventyConfig.addFilter('markdownify', (str) => {
        return str ? markdownItRenderer.render(str) : '';
      });
}

