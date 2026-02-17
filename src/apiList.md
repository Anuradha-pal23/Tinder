Api list

## In authRouter
post/auth/signup
post/auth/login
post/auth/logout

## In profileRouter
get/profile/view
patch/profile/edit
patch/profile/password

## In connectionRequestRouter
post/request/send/interested/:userId
post/request/send/ignored/:userId
post/request/send/accepted/requestId
post/request/send/rejected/requestId

## In userRouter
get/user/connection 
get/user/request
get/user/feed - gets you profile of others users on platform


status:ignored,interested,accepted,rejected
