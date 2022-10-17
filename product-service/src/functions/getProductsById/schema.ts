export default {
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "country": {
      "type": "string"
    },
    "price": {
      "type": "number"
    },
    "packaging": {
      "type": "number"
    },
    "image": {
      "type": "string"
    }
  },
  "required": [
    "id", "title"
  ]
} as const;
