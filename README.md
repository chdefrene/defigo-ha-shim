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
      resource: http://localhost:3000/doorbells/<doorbell_id>
      is_on_template: "{{ value_json.is_open }}"
      headers:
        Content-Type: text/plain
        Authorization: !secret defigo_access_token
```

### Important details:

`<doorbell_id>` is the ID of the entrance you want to access.

If you have multiple entrances, set up a RESTful switch for each of them.
