# mailer
[comment]: <> (Required section: Description & Functionalities)
## Description
A module used to handle sending emails with `AWS SDK` as SES client.

Available via `@flounder/mailer`

This package is using [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer) under the hood.

## Functionalities
### Allow use various email-providers
- Email sending abstraction that allows multiple providers implementation.
- Implementation is ready for `AWS SES` provider. Other providers need writing implementation from scratch inside this lib.

### Sending emails
- Use method `sendEmail` from `MailerFacade`.
- It takes parameter `payload` which is the same type as `sendEmail` method parameter from `@nestjs-modules/mailer`.

#### Example of use
Import `MailerModule` from `@flounder/mailer` inside your mailer module and configure it.
> Only `forRootAsync` method is supported

#### Using AWS SES

```typescript
import { EmailProvider, MailerModule } from '@flounder/mailer';
import { Module } from '@nestjs/common';
import { OurMailerFacade } from './services/our-mailer.facade';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          sesRegion: 'eu-west-1',
          emailProvider: EmailProvider.AWS_SES,
          transactionalEmailSender: 'example@example.com',
        };
      },
    }),
  ],
  providers: [OurMailerFacade],
  exports: [OurMailerFacade],
})
export class OurMailerModule {}
```

#### Using Other Mailer

```typescript
import { EmailProvider, MailerModule } from '@flounder/mailer';
import { Module } from '@nestjs/common';
import { OurMailerFacade } from './services/our-mailer.facade';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          port: '3333', // default 1025
          emailProvider: EmailProvider.Local,
          transactionalEmailSender: 'example@example.com',
        };
      },
    }),
  ],
  providers: [OurMailerFacade],
  exports: [OurMailerFacade],
})
export class OurMailerModule {}
```

Afterward, the mailer instance will be available to access across entire module, ex.

```typescript
import { Injectable } from '@nestjs/common';
import { MailerFacade } from '@flounder/mailer';

@Injectable()
export class OurMailerFacade {
  constructor(private readonly mailerFacade: MailerFacade) {}

  async sendNewsletter(): Promise<void> {
    return this.mailerFacade.sendEmail({
      to: 'example@example.com',
      subject: 'You are blocked',
      template: Template.BLOCKED,
      context: {
        title: 'You are blocked',
        body: `The user with this email is blocked`,
      },
    });
  }
}
```

### Available methods

```typescript
sendEmail: (payload: IEmailObject) => Promise<void>;
```
