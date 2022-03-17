## API Documentation

Request :

```http
GET /location
```

| Parameter | Type     | Description  |
| :-------- | :------- | :----------- |
| `name`    | `string` | **Required** |

**Successful Response :**

```json
{
  "latitude": "number",
  "longitude": "number"
}
```

Request :

```http
GET /weather
```

| Parameter   | Type     | Description  |
| :---------- | :------- | :----------- |
| `latitude`  | `number` | **Required** |
| `longitude` | `number` | **Required** |

**Successful Response:**

```json
{
  "request": "object",
  "location": "object",
  "current": "object"
}
```
