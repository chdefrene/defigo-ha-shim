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

### Important details:

For `resource`, enter

```
http://localhost:3000/doorbell/:doorbellId
```

where `:doorbellId` is the ID of the doorbell you want to access.

If you have multiple doorbells, set up a RESTful switch for each of them.

---

In `headers`, provide the access token:

```
Authorization: Bearer ey...vo
```
