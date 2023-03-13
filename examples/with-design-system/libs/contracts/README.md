# contracts

## Description

The package contains `schemas` and `custom validators` used inside app and shared between the apps.

## Functionalities

### DTO classes

- Add separate folder under `contracts/src` with the descriptive name, add your DTO file(s) according to `your-dto-name.ts` naming convention
- If you want to, you can also put there files with your DTOs mocks, preferable under `mocks.ts` file name
- All necessary files should be exported in `contracts/src/your-folder-name/index.ts` and `contracts/src/index.ts`
- Your DTOs are now available via `@flounder/contracts` pathname

[comment]: <> (Optional sections)

## Quick start

Everything exported from `contracts/index.ts` is visible in other modules using:

```
import { mySharedThing } from '@flounder/contracts'.
```
