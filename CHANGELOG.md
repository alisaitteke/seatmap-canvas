# Changelog

- - -
## [v2.5.19](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.18..v2.5.19) - 2024-02-04
#### Miscellaneous Chores
- **(index.html)** change div elements to td elements for better semantic structure in the table - ([ea5d5f8](https://github.com/alisaitteke/seatmap-canvas/commit/ea5d5f8acb3e742655ff3a9dd60c20996706797d)) - Ali

- - -

## [v2.5.18](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.17..v2.5.18) - 2024-02-04
#### Miscellaneous Chores
- **(index.html)** refactor selected seats display to use table structure for better readability and semantics - ([a1adcd5](https://github.com/alisaitteke/seatmap-canvas/commit/a1adcd5e2baf15724bca609c1f54d24206d05094)) - Ali

- - -

## [v2.5.17](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.16..v2.5.17) - 2024-02-04
#### Bug Fixes
- **(pull-request.yml)** add 'fetch-depth: 0' option to the checkout step to ensure all commit history is fetched - ([18a7ba0](https://github.com/alisaitteke/seatmap-canvas/commit/18a7ba05bbb0ca6682c4ddbce633e6c6f8d60cb8)) - Ali
- **(pull-request.yml)** add step to get the latest version tag and pass it as an environment variable to the create pull request step - ([15ae962](https://github.com/alisaitteke/seatmap-canvas/commit/15ae96266ef709d2cb3729ecd67f6dbde7226889)) - Ali
- **(pull-request.yml)** fix branch names in the 'gh pr create' command to correctly merge develop into master branch - ([91d9126](https://github.com/alisaitteke/seatmap-canvas/commit/91d9126975c59069369eab64f72a4011f41b65a0)) - Ali
- **(pull-request.yml)** update branch names and pull request title to reflect the correct branches and improve clarity - ([42a66e6](https://github.com/alisaitteke/seatmap-canvas/commit/42a66e6fe06c590831f02f9d6fe92e254a3de9c8)) - Ali
#### Features
- **(pull-request.yml)** add GitHub Actions workflow to automatically create a pull request on the develop branch - ([dc16ccf](https://github.com/alisaitteke/seatmap-canvas/commit/dc16ccf0c677501a68f963e19e51b290f5dd04a7)) - Ali
#### Miscellaneous Chores
- **(index.html)** remove console.log statements for seat and selectedSeat variables to clean up code - ([05406c6](https://github.com/alisaitteke/seatmap-canvas/commit/05406c65944001b9a79487ed3367089e47a48848)) - Ali
- **(index.html)** add total price and seat count to selected seats section for better user experience - ([0035002](https://github.com/alisaitteke/seatmap-canvas/commit/0035002716018830164e43f372d0662efe31d0c8)) - Ali
- **(index.html)** increase width of selected seats container to accommodate longer seat names - ([db6050c](https://github.com/alisaitteke/seatmap-canvas/commit/db6050cfa1dd1a0abb513ef557068d4eedc2fdb4)) - Ali
- **(index.html)** remove duplicate unselectSeat function to improve code readability and maintainability - ([f7418d1](https://github.com/alisaitteke/seatmap-canvas/commit/f7418d1cfaab9445c3b7839ad047b04778a0ae68)) - Ali
- **(index.html)** add selected seats section to improve user experience - ([5043e5b](https://github.com/alisaitteke/seatmap-canvas/commit/5043e5bfe77d799a65b993056524dee6425c3485)) - Ali
- **(publish.yml)** remove unused steps and comments from publish workflow - ([edd2118](https://github.com/alisaitteke/seatmap-canvas/commit/edd2118a50abdf5a25e83097a4751241609ddc73)) - Ali
- **(pull-request.yml)** remove unused pull request workflow file - ([ad0443f](https://github.com/alisaitteke/seatmap-canvas/commit/ad0443f6410a6564a339614d5ca6aef838fa3c9b)) - Ali
- **(pull-request.yml)** remove unused RELEASE_TYPE environment variable - ([dd2e3e0](https://github.com/alisaitteke/seatmap-canvas/commit/dd2e3e04e6ca318bb404651c3e61a53046ccc2d3)) - Ali
- **(pull-request.yml)** remove unnecessary hyphen in the Checkout step name to improve consistency and readability - ([4e63d36](https://github.com/alisaitteke/seatmap-canvas/commit/4e63d3681463ff892d96354526baf0980ee7c17c)) - Ali
- **(pull-request.yml)** add checkout step to the release job to ensure the correct code is used for the pull request - ([cd31f4d](https://github.com/alisaitteke/seatmap-canvas/commit/cd31f4d91fc13a64474ae30d34b7e5ed4cb22a6f)) - Ali
- **(pull-request.yml)** add GITHUB_TOKEN environment variable to the create pull request step - ([51970c2](https://github.com/alisaitteke/seatmap-canvas/commit/51970c2937ea3d0f91cd62cb3003f7888256451c)) - Ali
- **(pull-request.yml)** add pull request workflow file - ([79e066d](https://github.com/alisaitteke/seatmap-canvas/commit/79e066dc6bb9a50a6af0756b555c7e6e5145bb35)) - Ali

- - -

## [v2.5.16](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.15..v2.5.16) - 2024-01-13
#### Miscellaneous Chores
- **(package.json)** update version from 2.5.14 to 2.5.15 for the @alisaitteke/seatmap-canvas package - ([c4ef5f2](https://github.com/alisaitteke/seatmap-canvas/commit/c4ef5f26ddb7e0f7ddb0908bcb2ffe5bf82d9823)) - Ali

- - -

## [v2.5.15](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.14..v2.5.15) - 2024-01-13
#### Bug Fixes
- **(publish.yml)** add fetch-depth: 0 to the checkout step to ensure all commits are fetched - ([605dbb4](https://github.com/alisaitteke/seatmap-canvas/commit/605dbb4d6bb1385e1fce67f5f996104c736376e3)) - Ali
#### Miscellaneous Chores
- **(publish.yml)** update GitHub release documentation step to use the latest version of the release changelog builder action - ([170080a](https://github.com/alisaitteke/seatmap-canvas/commit/170080a8d5a01f327686b8cb71fa77420feedc0f)) - Ali
- **(publish.yml)** comment out changelog update and commit steps - ([467edc5](https://github.com/alisaitteke/seatmap-canvas/commit/467edc5d0dc5a00c354093cd886b80a2ca3553b6)) - Ali
- **(publish.yml)** remove fetch-depth option from checkout step to improve performance - ([83bc8d0](https://github.com/alisaitteke/seatmap-canvas/commit/83bc8d01b0e0f1b860ca88e251bfc7480e35693c)) - Ali
- **(publish.yml)** enable update changelog step and remove unused steps - ([b907573](https://github.com/alisaitteke/seatmap-canvas/commit/b9075734dd0332c718dff95f27282268468a49a3)) - Ali

- - -

## [v2.5.14](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.13..v2.5.14) - 2024-01-13
#### Miscellaneous Chores
- **(CHANGELOG.md)** remove unnecessary version entries - ([c0af6d4](https://github.com/alisaitteke/seatmap-canvas/commit/c0af6d4566853daa562c1a9aa346602890a1ea20)) - Ali

- - -


## [v2.5.11](https://github.com/alisaitteke/seatmap-canvas/compare/v2.5.10..v2.5.11) - 2024-01-13
#### Bug Fixes
- **(changelog.yaml)** add fetch-depth: 0 option to the checkout step to ensure full commit history is available for generating changelog - ([ee590c5](https://github.com/alisaitteke/seatmap-canvas/commit/ee590c5c201af6c175e4b8eff642d4a2339afd55)) - Ali
#### Miscellaneous Chores
- **(.gitignore)** add cog.toml to the list of ignored files - ([822a540](https://github.com/alisaitteke/seatmap-canvas/commit/822a5402dc662fb670e4f3e885dc81f486054c90)) - Ali
- **(CHANGELOG.md)** add newline at the end of the file for consistency - ([c946729](https://github.com/alisaitteke/seatmap-canvas/commit/c94672918e05e5d70ef0ea5a6bf9c6f017133a72)) - Ali
- **(CHANGELOG.md)** remove unnecessary lines and fix missing newline at end of file - ([d172b10](https://github.com/alisaitteke/seatmap-canvas/commit/d172b10c1de3973f3890d2a6b14252ee5b91c404)) - Ali
- **(changelog.yaml)** remove changelog.yaml workflow file - ([14b5248](https://github.com/alisaitteke/seatmap-canvas/commit/14b524838975bd61a3b3a216821fb73fc1e15c5d)) - Ali
- **(changelog.yaml)** disable conventional commit check in the changelog workflow - ([e47782e](https://github.com/alisaitteke/seatmap-canvas/commit/e47782ea6c69dd98aa514bc0f9dd1e15ad7be367)) - Ali
- **(changelog.yaml)** remove unnecessary 'release' input from cocogitto-action step - ([3eeff96](https://github.com/alisaitteke/seatmap-canvas/commit/3eeff96f3342ca6b7dca3319350bc83a56ca2161)) - Ali
- **(changelog.yaml)** remove fetch-depth option from checkout step in GitHub Actions workflow - ([3569359](https://github.com/alisaitteke/seatmap-canvas/commit/3569359f6cc107946fed2051dbf74075e8767840)) - Ali
- **(changelog.yaml)** add changelog generation workflow - ([754b874](https://github.com/alisaitteke/seatmap-canvas/commit/754b87414132c9fbebd8b36c29a452d500d51adf)) - Ali
- **(cog.toml)** remove cog.toml file - ([500bb66](https://github.com/alisaitteke/seatmap-canvas/commit/500bb66f9c75981169b97dc86e7c62c9f917d651)) - Ali

- - -
