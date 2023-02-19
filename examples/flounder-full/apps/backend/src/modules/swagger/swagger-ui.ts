import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Swagger {
  constructor(
    private readonly app: INestApplication,
    private readonly publicUserPoolId: string,
    private readonly publicApiClientId: string,
    private readonly apiUrl: string,
  ) {}

  build() {
    const config = new DocumentBuilder()
      .setTitle('Example API documentation')
      .addOAuth2({
        type: 'openIdConnect',
        openIdConnectUrl: `https://cognito-idp.eu-west-1.amazonaws.com/${this.publicUserPoolId}/.well-known/openid-configuration`,
      })
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('/swagger', this.app, document, {
      swaggerOptions: {
        oauth2RedirectUrl: `${this.apiUrl}/swagger/oauth2-redirect.html`,
        oauth: {
          clientId: this.publicApiClientId,
          scopes: ['openid', 'email', 'profile'],
        },
      },
    });
  }
}
