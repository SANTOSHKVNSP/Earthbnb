# Phase 2: Properties

## Rails
### Models
* Property

### Controllers
* Api::PropertiesController (index, create, show, update, destroy)

### Views

## Flux
### Views (React Components)
* PropertySearch
  - PropertyFilter
  - PropertyIndex
    - PropertyIndexItem
  - Map
* PropertyDetail
  - PropertyMainPhoto
  - PropertyInfo
  - AddReservation
  - TheSpaceInfo
  - AmenityIndex
    - AmenityIndexItem
  - MorePropertyInfo
  - PhotoIndex
    - PhotoIndexItem
    - AddPhoto

### Stores
* Properties

### Actions
* ApiActions.receiveAllProperties
* ApiActions.receiveSingleProperty
* ApiActions.deleteProperty
* PropertyActions.fetchAllProperties
* PropertyActions.fetchSingleProperty
* PropertyActions.createProperty
* PropertyActions.editProperty
* PropertyActions.destroyProperty

### ApiUtil
* ApiUtil.fetchAllProperties
* ApiUtil.fetchSingleProperty
* ApiUtil.createProperty
* ApiUtil.editProperty
* ApiUtil.destroyProperty

## Gems/Libraries
