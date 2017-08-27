# URL Shortener Microservice

For [freeCodeCamp](http://freecodecamp.com) - [Back end > API Projects > URL Shortener Microservice](https://www.freecodecamp.org/challenges/url-shortener-microservice)

## User Stories

1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.

## Usage

```
// Generate new short URL:
https://url-shortener-js.glitch.me/new/http://www.example.com
```

```
// Accesses a previously generated short URL:
https://url-shortener-js.glitch.me/5178

```

## Output

```
{
    "original_url": "http://www.example.com",
    "short_url": "https://url-shortener-js.glitch.me/5178"
}
```

```
{
    "error": "Invalid URL."
}
```