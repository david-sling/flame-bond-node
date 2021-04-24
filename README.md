# flame-bond-node

This server is used to access the data saved through [flame-bond](https://flamebond.davidsling.in)

Note: You should have created a collection at [flame-bond](https://flamebond.davidsling.in) before accessing these routes.

## Routes:

### `🟢​ GET /:email/:collection`

Returns the entire collection

### `🟢​ GET /:email/:collection/:id`

Returns one document

### `🟠 POST /:email/:collection/`

Creates an entry in { collection } with content from the request body

### `🔵 PATCH /:email/:collection/:id`

Patches doc ( id ) with content from the request body

### `​🔴 DELETE /:email/:collection/:id`

Deletes doc ( id )
