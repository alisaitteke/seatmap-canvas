# Changelog

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
