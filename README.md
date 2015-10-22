# tetra-icons
Create Tetra-ui web fonts from several SVG icons

## Preparing SVG's

Beware that your SVG icons must have a high enough height. 500 is a minimum. If
 you do not want to resize them, you can try to combine the `fontHeight` and
 the `normalize` option to get them in a correct size.

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

- Generate webFont via the cmd : `npm run generate-icon`
- Check the webFont `open index.html`

