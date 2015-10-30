# [Tetra-icons](http://viadeo.github.io/tetra-icons/)
Create Tetra-ui web font from several SVG icons

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

1. Generate webFont via the cmd : `npm run generate`
2. Check the webFont `open dist/index.html`
3. Push to the master `git commit -am "Update tetra-icon" && git push`
4. Release `npm run minor-release`
5. Deploy to gh-pages `npm run deploy`

Licence
-------
(The MIT License)

Copyright (c) Viadeo/APVO Corp., Antoine Duvillier and other Tetra contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
