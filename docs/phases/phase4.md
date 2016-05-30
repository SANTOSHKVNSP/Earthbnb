# Phase 4: Reviews

## Rails
### Models
* Review

### Controllers
* Api::ReviewController (create, destroy, index)

### Views

## Flux
### Views (React Components)
* ReviewsSelector
  - ReviewType
  - ReviewsToWriteIndex
    - ReviewsToWriteItem
  - PastReviewsIndex
    - PastReviewsItem
* NewReview

### Stores
* Reviews

### Actions
* ApiActions.receiveAllReviews
* ApiActions.deleteReview
* ReviewActions.fetchAllReviews
* ReviewActions.createReview
* ReviewActions.destroyReview

## Gems/Libraries
