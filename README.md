# go-away-kitty

> :feet: :crying_cat_face: Serverless functions for dealing with kitty detections.

> Kitty sightings with images can now be processed with AI!

## Install

With [node](https://nodejs.org/) installed, install the Serverless Architecture (and OpenWhisk Extension):

```
$ npm i -g serverless serverless-openwhisk
```

Clone this repository

```
$ git clone git@github.com:lynnaloo/go-away-kitty.git
```

Install dependencies

```
$ npm i
```

Setup your Account Provider (AWS, Google, Azure, etc)

*   [AWS Lambda](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
*   [OpenWhisk](https://serverless.com/framework/docs/providers/openwhisk/guide/credentials/) 

Deploy Lambda Functions

```
$ sls deploy -v
```

## Lambda Configuration

Set Environment Variables

*   Local development - copy `sample-env.json` to `env.json`
*   Remote and production development - use AWS CLI or AWS Console to set encrypted values

## See Also

*   [Serverless Framwork](http://www.serverless.com)

## License

MIT
