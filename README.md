# hexo-insert-markdown

A [Hexo](https://hexo.io/) plugin that allows you to insert Markdown files in existing Markdown files.

## Usage

1. Add this plugin to your Hexo site with `npm install hexo-insert-markdown --save`
1. Open your Markdown file (a page or post) and include this custom tag:

```md
{% insertmd your/file.md %}
```

If you want to specify a custom separator, that is rendered after each include, you can use:

```md
{% insertmd your/file.md '---' %}
```

It is also possible to include all top-level Markdown files from a directory:

```md
{% insertmd your/directory/with/includes '---' %}
```

**Note:** The path to file includes must be relative to the [source directory](https://hexo.io/docs/configuration.html#Directory) of your Hexo installation.

You also have to rebuild your site to see the effect of this plugin:

```bash
hexo clean && hexo generate
```

## FAQ

- Why is this plugin using tags (`{% ... %}`) instead of [helpers](https://hexo.io/docs/helpers) (`<%- ... %>`)?

> Helpers cannot be used in source files, that's why this plugin has to use tags.

- What was your motivation?

> This plugin was inspired by [hexo-include-markdown](https://github.com/tea3/hexo-include-markdown). It extends its functionality with syntax highlighting for [code blocks](https://hexo.io/docs/syntax-highlight.html#How-to-use-code-block-in-posts).
