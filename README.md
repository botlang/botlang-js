[![Build Status](https://api.travis-ci.org/botlang/botlang-js.svg?branch=master)](https://travis-ci.org/botlang/botlang-js)

# Botlang JS

Botlang implementation for JavaScript

## Source code documentation

The project uses [ESDoc](https://esdoc.org/) for generating source code documentation. Consult the project website for related questions and use appropriate tags in the code. The standard output directory for local development is `doc/`. The build process can be triggered via the cli `npm run make:doc`.

The online source code documentation can be found [here](https://doc.esdoc.org/github.com/botlang/botlang-js/).

### Update online documentation

```sh
# To trigger the build process for the hosted documentation fire this curl cmd
# or follow the instruction on https://doc.esdoc.org/-/generate.html
$ curl -X POST \
       -H 'Accept: application/json' \
       -H 'content-type: application/x-www-form-urlencoded' \
       -d 'gitUrl=git@github.com:botlang/botlang-js.git' \
      'https://doc.esdoc.org/api/create'
```

## License

This distribution is covered by the **GNU GENERAL PUBLIC LICENSE**, Version 3, 29 June 2007.

## Support & Contact

Having trouble with this repository? Check out the documentation at the repository's site or contact m@matchilling.com and we’ll help you sort it out.

Happy Coding

:v:
