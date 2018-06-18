`config.json` is REQUIRED in this directory to set ENV variables. Example `config.json`:

```json
{
  "test": {
    "PORT": "YOUR_PORT_NUMBER",
    "MONGODB_URI": "YOUR_MONGODB_URI",
    "JWT_SECRET": "YOUR_JWT_SECRET"
  },
  "development": {
    "PORT": "YOUR_PORT_NUMBER",
    "MONGODB_URI": "YOUR_MONGODB_URI",
    "JWT_SECRET": "YOUR_JWT_SECRET"
  }
}
```
