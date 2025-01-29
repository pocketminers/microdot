# Artifacts Module Documentation

The `artifacts` module contains the core classes and objects required to run the microdot architecture. This module provides a set of reusable components that define the structure and behavior of various elements within the system. 

## Classes and Interfaces

### Metadata

The `Metadata` class represents additional information about an object.

#### Annotations

An annotation is a key-value pair that provides additional information about an object. Annotations are used to add metadata to an object. Annotations are stored in the `annotations` property of the `Metadata` class.

```json
{
  "apiVersion": "pocket/v1",
  "kind": "Argument",
  "metadata": {
    "name": "sample-metadata",
    "annotations": {
      "author": "John Doe",
      "version": "1.0.0",
      "hash": "0x1234567890abcdef",
      "createdAt": "2021-01-01T00:00:00Z"
    }
  },
  "spec": {
    "name": "count",
    "value": 10
  }
}
```

##### Special Annotations

- `createdAt`: The date and time when the object was created in ISO 8601 format.
- `hash`: The hash value of the spec field of the object.

#### Labels

A label is a key-value pair that provides additional information about an object. Labels are used to add metadata to an object. Labels are stored in the `labels` property of the `Metadata` class.

```json
{
  "apiVersion": "pocket/v1",
  "kind": "Argument",
  "metadata": {
    "name": "sample-metadata",
    "labels": {
      "app": "sample-app",
      "env": "dev",
      "id": "1234567890"
    }
  },
  "spec": {
    "name": "count",
    "value": 10
  }
}
```

###### Special Labels

- `id`: The identifier of the object, which is assigned by the ID generator.

---

### Property

The `Property` class represents a property that can be used to store and retrieve values.

The `Property` class is a generic class that allows you to specify the type of the property value. This allows you to create properties with different types of values. Microdot is a template-based system, so you can use the `Property` class to create properties using specifically defined JSON Objects

```json
{
  "apiVersion": "pocket/v1",
  "kind": "Property",
  "metadata": {
    "name": "sample-property"
  },
  "spec": {
    "name": "count",
    "value": 10
  }
}
```

---



### Hashable

The `Hashable` class represents an object that can be hashed.

* 

---


### Argument
> Extends `Hashable`

The `ArgumentEntry` interface defines the structure of an argument entry used to create an argument. The `Argument` class represents an argument that specifies the value of a parameter by name.


The `ArgumentEntry` interface is a generic interface that allows you to specify the type of the argument value. This allows you to create arguments with different types of values.  Microdot is a template-based system, so you can use the `ArgumentEntry` interface to create arguments using specifically defined JSON Objects

```json
{
  "apiVerswion": "pocket/v1",
  "kind": "Argument",
  "metadata": {
    "name": "sample-argument"
  },
  "spec": {
    "name": "count",
    "value": 10
  }
}
```
is equivalent to 
```typescript
const entry: ArgumentEntry<number> = { name: 'count', value: 10 };
```

#### Accessors
- `name: string`: Returns the name of the argument.
- `value: T`: Returns the value of the argument.

#### Example
```typescript
const entry: ArgumentEntry<number> = { name: 'count', value: 10 };
const argument = new Argument(entry);
console.log(argument.name); // Output: count
console.log(argument.value); // Output: 10
```
---

### Parameter
> Extends `Hashable`

The `ParameterEntry` interface defines the structure of a parameter entry used to create a parameter. The `Parameter` class represents a parameter that specifies the type and value of a parameter by name.

```json
{
  "apiVersion": "pocket/v1",
  "kind": "Parameter",
  "metadata": {
    "name": "sample-parameter"
  },
  "spec": {
    "required": true,
    "name": "count",
    "description": "The number of items",
    "type": "number",
    "defaultValue": 10,
    "opitonalValues": [5, 10, 15]
  }
}
```
is equivalent to 
```typescript
const entry: ParameterEntry<number> = { 
  name: 'count', 
  description: 'The number of items',
  required: true,
  defaultValue: 10,
  optionalValues: [5, 10, 15]
};
```

#### Methods

- `getValue(value: T): T`: Returns the input value if it is in the optional values list, otherwise returns the default value of the parameter(if available).  If the parameter is required and the input value is not in the optional values list, an error is thrown.

#### Accessors
- `name: string`: Returns the name of the parameter.
- `description: string`: Returns the description of the parameter.
- `required: boolean`: Returns whether the parameter is required.
- `type: string`: Returns the type of the parameter.
- `defaultValue: T`: Returns the default value of the parameter.
- `optionalValues: T[]`: Returns the optional values of the parameter.

#### Example
```typescript
const entry: ParameterEntry<number> = { 
  name: 'count', 
  description: 'The number of items',
  required: true,
  defaultValue: 10,
  optionalValues: [5, 10, 15]
};
const parameter = new Parameter(entry);
console.log(parameter.name); // Output: count
console.log(parameter.description); // Output: The number of items
console.log(parameter.required); // Output: true
console.log(parameter.type); // Output: number
console.log(parameter.defaultValue); // Output: 10
console.log(parameter.optionalValues); // Output: [5, 10, 15]
```

---

### Store

The `Store` class represents a store that can be used to store and retrieve objects.

---

### Identifiable

The `Identifiable` class represents an object that can be identified by a unique identifier.

---

### Configurable

The `Configurable` class represents an object that can be configured with arguments.

---