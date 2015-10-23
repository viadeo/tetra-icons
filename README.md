# [Tetra-icons](http://viadeo.github.io/tetra-icons/)
Create Tetra-ui web fonts from several SVG icons

## Preparing SVG's

Beware that your SVG icons must have a high enough height. 500 is a minimum.

### Illustrator

Save your file as SVG with the following settings:

- SVG Profiles: SVG 1.1
- Fonts Type: SVG
- Fonts Subsetting: None
- Options Image Location: Embed
- Advanced Options
  - CSS Properties: Presentation Attributes
  - Decimal Places: 1
  - Encoding: UTF-8
  - Output fewer <tspan> elements: check

Leave the rest unchecked.

## Generating WebFonts

All new `.svg` icon must be inside the `icons` folder with the file name pattern `iconname.svg`.

1. Generate webFont via the cmd : `npm run generate-icon`
2. Check the webFont `open dist/index.html`
3. Push to the master `git commit -am "Update tetra-icon" && git push`
4. Release `npm run minor-release`
5. Deploy to gh-pages `npm run deploy`
