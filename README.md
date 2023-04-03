# Defigo Shim

This is a simple shim for converting the Defigo API into a [RESTful Switch](https://www.home-assistant.io/integrations/switch.rest/) in Home Assistant.

## Install

Example docker-compose.yaml:

```yaml
defigo:
  container_name: defigo
  image: chdefrene/defigo-ha-shim
  restart: unless-stopped
  ports:
    - 3000:3000
```

Now you can follow the Home Assistant instructions for setting up a [RESTful Switch](https://www.home-assistant.io/integrations/switch.rest/).

Example configuration.yaml:

```yaml
switch:
  - platform: rest
    name: Entrance
    resource: http://localhost:3000
    params:
      doorbell_id: 1234
    headers:
      Content-Type: text/plain
      Authorization: !secret defigo_access_token
```

### Important details:

* `resource` is the IP address of the computer running the shim.  
The default port is 3000 unless mapped otherwise.


* The `doorbell_id` query param is the ID of the entrance you want to access.  
If you have multiple entrances, set up a RESTful switch for each of them.


* The `Authorization` header contains a bearer token with the Defigo access token.


* `Content-Type` needs to be `text/plain`!
